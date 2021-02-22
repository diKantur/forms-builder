import { Action } from '@ngrx/store';
import { State } from './core.reducer';

export enum ActionTypes {
  UpdateStyleAction = '[App] UpdateStyleAction',
  Enter = '[App] Enter',
  Drop = '[App] Drop',
  Login = '[Auth] Login',
  Register = '[Auth] Drop',
  Logged = '[Auth] Logged',
  Registered = '[Auth] Registered',
}
export class UpdateStyleAction implements Action {
  readonly type = ActionTypes.UpdateStyleAction;
  constructor(public payload: any) {}
}
export class EnterAction implements Action {
  readonly type = ActionTypes.Enter;
  constructor(public payload: any) {}
}

export class DropAction implements Action {
  readonly type = ActionTypes.Drop;
  constructor(public payload: any) {}
}
export class LoginAction implements Action {
  readonly type = ActionTypes.Login;
  constructor(public payload: any) {}
}
export class RegisterAction implements Action {
  readonly type = ActionTypes.Register;
  constructor(public payload: any) {}
}
export class LoggedAction implements Action {
  readonly type = ActionTypes.Logged;
  constructor(public payload: any) {}
}
export class RegisteredAction implements Action {
  readonly type = ActionTypes.Registered;
  constructor(public payload: any) {}
}

export type Actions =
  | EnterAction
  | UpdateStyleAction
  | DropAction
  | LoginAction
  | RegisterAction
  | LoggedAction
  | RegisteredAction;
