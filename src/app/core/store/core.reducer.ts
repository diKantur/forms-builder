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
  return list === ''
    ? { formStyle: { ...data } }
    : {
        formElementList: [
          ...state.formElementList.map((v: any, i: any) =>
            i === list ? { ...v, style: { ...data } } : v
          ),
        ],
      };
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
