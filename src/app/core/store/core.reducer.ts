import { Actions, ActionTypes } from './core.actions';

export interface State {
  formElementList: any[];
  formProp: { style: {} };
  elementList: any[];
}

export const INIT_STATE = {
  formElementList: [],
  formProp: { style: {} },
  elementList: [
    { style: { placeholder: '', required: 'false' }, value: 'input' },
    { style: { placeholder: '' }, value: 'button' },
    { style: { placeholder: '' }, value: 'checkbox' },
    { style: { placeholder: '' }, value: 'select' },
    { style: { placeholder: '' }, value: 'textarea' },
  ],
};

export function reducer(state = INIT_STATE, { type, payload }: Actions): any {
  switch (type) {
    case ActionTypes.UpdateStyleAction:
      return { ...state, ...updateStyle(state, payload) };
    case ActionTypes.Drop:
      return { ...state, ...payload };
    default:
      return state;
  }
}

function updateStyle(state, payload): State {
  const data = { ...state };

  payload.idx === ''
    ? (data.formProp = { style: { ...payload.data } })
    : (data.formElementList = [
        ...state.formElementList.map((v: any, i: any) =>
          i === payload.idx ? { ...v, style: { ...payload.data } } : v
        ),
      ]);

  return data;
}

export const getState = (state: State) => state;
export const getElementList = (state: State) => state.elementList;
export const getFormElementList = (state: State) => state.formElementList;
export const getFormProp = (state: State) => state.formProp;
