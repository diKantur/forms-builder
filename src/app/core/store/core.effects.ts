import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';
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
      filter((action) => ActionTypes.Enter === action.type),
      map((action: any) => action.payload),
      switchMap((action) => of(new UpdateStyleAction(action)))
    )
  );

  onLogin$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => ActionTypes.Login === action.type),
      map((action: any) => action.payload),
      switchMap((action) => {
        this.authService.login(action.email, action.password).subscribe(() => {
          this.router.navigateByUrl('/');
        });

        return of(new LoggedAction(action));
      })
    )
  );

  onRegister$ = createEffect(() =>
    this.actions$.pipe(
      filter((action) => ActionTypes.Register === action.type),
      map((action: any) => action.payload),
      switchMap((action) => {
        this.authService
          .register(action.email, action.password)
          .subscribe(() => {
            this.router.navigateByUrl('/');
          });
        return of(new RegisteredAction(action));
      })
    )
  );
}
