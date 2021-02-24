import { Actions, ActionTypes } from './core.actions';

export interface State {
  formElementList: any[];
  formProp: { style: {} };
  elementList: any[];
}

export const INIT_STATE = {
  formElementList: [],
  formProp: {},
  elementList: [
    { style: {}, value: 'input', placeholder: 'input', required: 'false' },
    { style: {}, value: 'button', placeholder: 'button' },
    { style: {}, value: 'checkbox', placeholder: 'checkbox' },
    { style: {}, value: 'select', placeholder: 'select' },
    { style: {}, value: 'textarea', placeholder: 'textarea' },
  ],
};

export function reducer(state = INIT_STATE, { type, payload }: Actions): any {
  switch (type) {
    case ActionTypes.UpdateStyleAction:
      const data = { ...state };

      if (payload.idx === '') {
        data.formProp = { ...payload.data };
      } else {
        data.formElementList = [
          ...state.formElementList.map((v, i) =>
            i === payload.idx ? { ...v, ...payload.data } : v
          ),
        ];
      }

      return { ...state, ...data };
    case ActionTypes.Drop:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export const getState = (state: State) => state;
export const getElementList = (state: State) => state.elementList;
export const getFormElementList = (state: State) => state.formElementList;
export const getFormProp = (state: State) => state.formProp;
