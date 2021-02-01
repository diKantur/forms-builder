import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';

export const setStyle = createAction(
  '[AppComponent] setStyle',
  props<{ list; data }>()
);
export class EnterAction implements Action {
  readonly type = '[App] Enter';
  constructor(public payload) {}
}

export type Actions = EnterAction;
