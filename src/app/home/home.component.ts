import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { DropAction, EnterAction } from '../core/store/core.actions';
import {
  getElementList,
  getFormElementList,
  getFormStyle,
} from '../core/store/index';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<void>();

  formElementList = [];
  formStyle$: Observable<any>;
  formElementList$: Observable<any>;
  elementList$: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.formStyle$ = this.store.select(getFormStyle);
    this.formElementList$ = this.store.select(getFormElementList);
    this.elementList$ = this.store.select(getElementList);

    this.formElementList$.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
      this.formElementList = [...v.map((val: any) => val)];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEnterClick(val, idx = ''): void {
    let obj = {};

    val = val.split(';').map((v) => v?.split(':').map((e) => e.trim()));
    val?.map((v: any[]) => {
      switch (idx !== '') {
        case true:
          obj = { ...this.formElementList[idx], style: { [v[0]]: v[1] } };
          break;
        case false:
          obj = { [v[0]]: v[1] };
          break;
      }
    });

    this.store.dispatch(new EnterAction({ list: idx, data: obj }));
  }

  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.store.dispatch(
      new DropAction({ formElementList: [...this.formElementList] })
    );
  }
}
