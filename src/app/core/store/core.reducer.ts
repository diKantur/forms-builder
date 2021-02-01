import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { setStyle, Actions } from './core.actions';

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

function sw(state, list, data) {
  switch (list === '') {
    case true:
      return {
        ...state,
        formProp: { ...data },
      };
    case false:
      let one = {
        ...state,
        formElementList: [
          ...state.formElementList.map((v, i) =>
            i === list ? { ...data } : { ...state.formElementList[i] }
          ),
        ],
      };
      console.log(one);

      return one;
  }
}

const _valueReducer = createReducer(
  INIT_STATE,
  on(setStyle, (state, { list, data }) => {
    return sw(state, list, data);
  })
);

export function valueReducer(state, action) {
  return _valueReducer(state, action);
}
