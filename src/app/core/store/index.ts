import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromCore from './core.reducer';

export const reducers: ActionReducerMap<any> = {
  core: fromCore.reducer,
};

export const getCoreState = (state) => state.core;

export const getState = createSelector(getCoreState, fromCore.getState);
export const getElementList = createSelector(
  getCoreState,
  fromCore.getElementList
);
export const getFormElementList = createSelector(
  getCoreState,
  fromCore.getFormElementList
);
export const getFormStyle = createSelector(getCoreState, fromCore.getFormStyle);
