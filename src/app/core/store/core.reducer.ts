import { Actions, ActionTypes } from './core.actions';

export const INIT_STATE = {
  formElementList: [],
  formProp: {
    style: {},
  },
  elementList: [
    { style: {}, type: 'input' },
    { style: {}, type: 'button' },
    { style: {}, type: 'checkbox' },
    { style: {}, type: 'select' },
    { style: {}, type: 'textarea' },
  ],
};

function switcher(state, { list, data }): any {
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

export function reducer(state = INIT_STATE, action: Actions): any {
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
