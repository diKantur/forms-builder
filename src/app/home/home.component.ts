import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { DropAction, EnterAction } from '../core/store/core.actions';
import { getState } from '../core/store/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  value$: Observable<any>;
  form: FormGroup;

  sub = {
    formProp: { style: {} },
    formElementList: [],
    elementList: [],
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.value$ = this.store.select(getState);
    this.value$.subscribe((v) => {
      this.sub.formProp = { style: { ...v.formProp.style } };
      this.sub.formElementList = [...v.formElementList.map((v) => v)];
      this.sub.elementList = [...v.elementList.map((v) => v)];
    });
  }

  onEnterClick(val, idx = '') {
    let obj = {};

    val = val.split(';').map((v) => v?.split(':').map((e) => e.trim()));
    val?.map((v) => {
      switch (idx !== '') {
        case true:
          obj = { ...this.sub.formElementList[idx], style: { [v[0]]: v[1] } };
          break;
        case false:
          obj = { ...this.sub.formProp, style: { [v[0]]: v[1] } };
          break;
      }
    });

    this.store.dispatch(new EnterAction({ list: idx, data: obj }));
  }

  drop(event: any) {
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
    this.store.dispatch(new DropAction({ ...this.sub }));
  }
}
