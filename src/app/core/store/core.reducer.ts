import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Actions, ActionTypes } from './core.actions';

export const INIT_STATE = {
  formElementList: [
    { title: 'input', style: {}, value: 'input', type: 'text' },
    { title: 'input2', style: {}, value: 'input2', type: 'text' },
  ],
  formProp: {
    style: {},
  },
  elementList: [
    { title: 'input', style: {}, value: 'input', type: 'text' },
    { title: 'button', style: {}, value: 'button', type: 'button' },
    { title: 'input2', style: {}, value: 'input2', type: 'text' },
    { title: 'input3', style: {}, value: 'input3', type: 'text' },
    { title: 'input4', style: {}, value: 'input4', type: 'text' },
    { title: 'input5', style: {}, value: 'input5', type: 'text' },
  ],
};

function switcher(state, { list, data }) {
  switch (list === '') {
    case true:
      return { formProp: { ...data } };
    case false:
      return {
        formElementList: [
          ...state.formElementList.map((v, i) =>
            i === list ? { ...data } : { ...v }
          ),
        ],
      };
  }
}

export function reducer(state = INIT_STATE, action: Actions) {
  switch (action.type) {
    case ActionTypes.UpdateStyleAction:
      return { ...state, ...switcher(state, { ...action.payload }) };
    case ActionTypes.Drop:

      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const getState = (state) => state;
