import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { EnterAction } from './core/store/core.actions';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  value$: Observable<any>;
  form: FormGroup;

  sub = {
    formProp: { style: {} },
    formElementList: [],
    elementList: [],
  };

  constructor(private store: Store) {}

  ngOnInit() {
    this.value$ = this.store;
    this.value$.subscribe((v) => {
      this.sub = {
        ...this.sub,
        formElementList: v.value.formElementList,
        formProp: v.value.formProp,
        elementList: v.value.elementList,
      };
      console.log(v.value);
    });
  }

  onEnterClick(val, idx = '') {
    let obj = {};

    val = val.split(';').map((v) => v?.split(':'));
    val?.map((v) => {
      v[0] = v[0].trim();
      v[1] = v[1].trim();
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
