import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { ActionTypes, UpdateStyleAction, DropAction } from './core.actions';
import { of } from 'rxjs';
@Injectable()
export class Effects {
  constructor(private actions$: Actions) {}

  onEnter$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => ActionTypes.Enter === action.type),
      map((action: any) => this.switcher(action)),
      switchMap((action) => of(new UpdateStyleAction(action)))
    )
  );

  switcher(action): any {
    switch (true) {
      case action.type === ActionTypes.Drop:
        of(new DropAction(action.payload));
        return action;

      case action.type === ActionTypes.Enter:
        return action.payload;

      default:
        break;
    }
  }
}
