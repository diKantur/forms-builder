import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';

import { DropAction, EnterAction } from '../core/store/core.actions';
import {
  getElementList,
  getFormElementList,
  getFormProp,
} from '../core/store/index';
import { map, takeUntil } from 'rxjs/operators';
import { PortalService } from '../services/portal.service';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  formProp$: Observable<any>;
  formProp = { style: {} };

  formElementList$: Observable<any>;
  formElementList = [];

  elementList$: Observable<any>;

  portalList = [];
  public form: FormGroup;

  constructor(private store: Store, public portalService: PortalService) {}

  @ViewChild(CdkPortalOutlet) cdk: any;

  ngOnInit(): void {
    this.formProp$ = this.store.select(getFormProp).pipe(map((v) => v.style));
    this.formElementList$ = this.store.select(getFormElementList);
    this.elementList$ = this.store.select(getElementList);

    this.formElementList$.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
      this.formElementList = [...v.map((val: any) => val)];
    });

    this.portalService.portal$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v) {
        this.portalList[v[0]] = v[1];
      }
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openGroup(idx: number): void {
    if (this.cdk.hasAttached()) {
      this.cdk.detach();
    }
    this.portalList[idx].attach(this.cdk);
  }

  onEnterClick(val: any, idx: number | string = ''): void {
    let data = idx === '' ? this.formProp : this.formElementList[idx];

    val = val
      .split(';')
      .map((v: string) => v?.split(':').map((e: string) => e.trim()));

    val?.forEach((v: any[]) => {
      if (v[0] === 'placeholder' || v[0] === 'required') {
        if (data[v[0]]) {
          data = { ...data, [v[0]]: v[1] };
        } else {
          return;
        }
      }
      data = { ...data, style: { ...data.style, [v[0]]: v[1] } };
    });

    this.store.dispatch(new EnterAction({ idx, data }));
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

  private initForm(): void {
    this.form = new FormGroup({
      form: new FormControl(),
      input: new FormControl(),
    });
  }
}
