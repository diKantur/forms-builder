import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { setStyle } from './core.actions';

@Injectable()
export class Effects {
  constructor(private actions$: Actions) {}

  onEnter$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Enter'),
      map((action: any) => setStyle(action.payload))
    )
  );
}
