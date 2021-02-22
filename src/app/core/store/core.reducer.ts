import { Actions, ActionTypes } from './core.actions';

export interface State {
  formElementList: any[];
  formStyle: {};
  elementList: any[];
}

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

export function reducer(state = INIT_STATE, { type, payload }: Actions): any {
  switch (type) {
    case ActionTypes.UpdateStyleAction:
      const data = { ...state };

      if (payload.idx === '') {
        data.formStyle = { ...payload.data };
      } else {
        data.formElementList = [
          ...state.formElementList.map((v, i) =>
            i === payload.idx ? { ...v, style: payload.data } : v
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
export const getFormStyle = (state: State) => state.formStyle;
