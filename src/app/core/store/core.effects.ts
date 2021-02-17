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
      map((action: any) => action.payload),
      switchMap((action) => of(new UpdateStyleAction(action)))
    )
  );
}
