import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
  ActionTypes,
  UpdateStyleAction,
  LoggedAction,
  RegisteredAction,
} from './core.actions';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    public authService: AuthService,
    private router: Router
  ) {}

  onEnter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Enter),
      map((action: any) => action.payload),
      switchMap((action) => of(new UpdateStyleAction(action)))
    )
  );

  onLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Login),
      map((action: any) => action.payload),
      switchMap((action) => {
        this.authService
          .login(action.email, action.password)
          .forEach(() => this.router.navigateByUrl('/'));
        return of(new LoggedAction(action));
      })
    )
  );

  onRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Register),
      map((action: any) => action.payload),
      switchMap((action) => {
        this.authService.register(action.email, action.password);
        return of(new RegisteredAction(action));
      })
    )
  );
}
