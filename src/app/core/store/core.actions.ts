import { Action } from '@ngrx/store';

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
  constructor(public payload) {}
}
export class EnterAction implements Action {
  readonly type = ActionTypes.Enter;
  constructor(public payload) {}
}

export class DropAction implements Action {
  readonly type = ActionTypes.Drop;
  constructor(public payload) {}
}
export class LoginAction implements Action {
  readonly type = ActionTypes.Login;
  constructor(public payload) {}
}
export class RegisterAction implements Action {
  readonly type = ActionTypes.Register;
  constructor(public payload) {}
}
export class LoggedAction implements Action {
  readonly type = ActionTypes.Logged;
  constructor(public payload) {}
}
export class RegisteredAction implements Action {
  readonly type = ActionTypes.Registered;
  constructor(public payload) {}
}

export type Actions =
  | EnterAction
  | UpdateStyleAction
  | DropAction
  | LoginAction
  | RegisterAction
  | LoggedAction
  | RegisteredAction;
