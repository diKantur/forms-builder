import { Actions, ActionTypes } from './core.actions';

export const INIT_STATE = {
  formElementList: [],
  formStyle: {},
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
      return { formStyle: { ...data } };
    case false:
      return {
        formElementList: [
          ...state.formElementList.map((v: any, i: any) => {
            if (i === list) {
              return { ...v, style: { ...data } };
            } else {
              return v;
            }
          }),
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
export const getElementList = (state) => state.elementList;
export const getFormElementList = (state) => state.formElementList;
export const getFormStyle = (state) => state.formStyle;
