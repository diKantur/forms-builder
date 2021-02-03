import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { DropAction, EnterAction } from './core/store/core.actions';
import { FormGroup } from '@angular/forms';
import { getState } from './core/store/index';

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
    this.value$ = this.store.select(getState);
    this.value$.subscribe((v) => {
      this.sub.formProp={ style: {...v.formProp.style} }
      this.sub.formElementList=[...v.formElementList.map(v=>v)]
      this.sub.elementList=[...v.elementList.map(v=>v)]
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
    this.store.dispatch(
      new DropAction({...this.sub})
    );
  }
}
