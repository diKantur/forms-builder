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
  getFormStyle,
} from '../core/store/index';
import { takeUntil } from 'rxjs/operators';
import { PortalService } from '../services/portal.service';
import { CdkPortalOutlet } from '@angular/cdk/portal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  formStyle$: Observable<any>;
  formStyle = {};

  formElementList$: Observable<any>;
  formElementList = [];

  elementList$: Observable<any>;

  portalList = [];

  constructor(private store: Store, public portalService: PortalService) {}

  @ViewChildren(CdkPortalOutlet) cdk: any[];

  ngOnInit(): void {
    this.formStyle$ = this.store.select(getFormStyle);
    this.formElementList$ = this.store.select(getFormElementList);
    this.elementList$ = this.store.select(getElementList);

    this.formElementList$.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
      this.formElementList = [...v.map((val: any) => val)];
    });
    this.formStyle$.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
      this.formStyle = { ...v };
    });

    this.portalService.portal$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v) {
        this.portalList[v[0]] = v[1];
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openGroup(idx: number): void {
    this.portalList[idx].attach(this.cdk.filter((val, i) => i === idx)[0]);
  }

  closeGroup(idx: number): void {
    this.portalList[idx].detach();
  }

  onEnterClick(val: any, idx: number | string = ''): void {
    let data = idx === '' ? this.formStyle : this.formElementList[idx].style;

    val = val
      .split(';')
      .map((v: string) => v?.split(':').map((e: string) => e.trim()));

    val?.map((v: any[]) => {
      data = { ...data, [v[0]]: v[1] };
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
}
