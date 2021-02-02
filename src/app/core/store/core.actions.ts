import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  UpdateStyleAction = '[App] UpdateStyleAction',
  Enter = '[App] Enter',
  Drop = '[App] Drop',
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
export type Actions = EnterAction | UpdateStyleAction | DropAction;
