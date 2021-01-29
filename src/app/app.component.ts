import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { setStyle, getStyle } from './core/actions/core.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  value$: Observable<any>;

  sub = {
    formProp: { style: {} },
    formElementList: [],
    elementList: [],
  };

  constructor(private store: Store<any>) {
    this.value$ = store.select('value');
  }

  ngOnInit() {
    this.value$.subscribe((v) => {
      this.sub = {
        ...this.sub,
        formElementList: v.formElementList,
        formProp: v.formProp,
        elementList: v.elementList,
      };
    });
  }

  displayStyle(idx = '') {
    return idx === ''
      ? this.sub.formProp.style
      : this.sub.formElementList[idx].style;
  }

  setValue(val, idx = '') {
    let obj = {};
    val = val.split(';').map((v) => v?.split(':'));
    val?.map((v) => {
      v[0] = v[0].trim();
      v[1] = v[1].trim();
      switch (idx !== '') {
        case true:
          obj = { ...this.sub.formElementList[idx].style, [v[0]]: v[1] };
          break;
        case false:
          obj = { ...this.sub.formProp.style, [v[0]]: v[1] };
          break;
      }
    });

    this.store.dispatch(setStyle({ list: idx, data: obj }));

    return obj;
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
  }
}
