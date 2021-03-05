import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChildren,
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

  @ViewChildren(CdkPortalOutlet) cdk: any;

  ngOnInit(): void {
    this.formProp$ = this.store.select(getFormProp).pipe(map((v) => v.style));
    this.formElementList$ = this.store.select(getFormElementList);
    this.elementList$ = this.store.select(getElementList);

    this.formElementList$.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
      this.formElementList = [...v.map((val: any) => val)];
    });

    this.portalService.portal$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v && v[0] !== undefined) {
        this.portalList[v[0]] = v[1];
      }
    });
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openGroup(event, idx: number): void {
    if (this.cdk) {
      const el = this.cdk.toArray()[idx];

      if (el.hasAttached()) {
        el.detach();
      }
      this.portalList[idx].attach(el);
    }
  }

  identify(index, item): any {
    return item.id;
  }

  onEnterClick(val: any, idx: any = ''): void {
    let data =
      idx === '' ? this.formProp.style : this.formElementList[idx].style;

    val
      .split(';')
      .map((v: string) => v?.split(':').map((e: string) => e.trim()))
      .forEach((v: any[]) => {
        if (v[0] === 'placeholder' && typeof data[v[0]] !== 'string') {
          return;
        }

        if (v[0] === 'required' && !data[v[0]]) {
          return;
        }

        data = { ...data, [v[0]]: v[1] };
      });
    this.store.dispatch(new EnterAction({ idx, data }));
  }

  movePortals(event): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.portalList, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        this.portalList,
        event.previousIndex,
        event.currentIndex
      );
    }
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

    this.movePortals(event);
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
