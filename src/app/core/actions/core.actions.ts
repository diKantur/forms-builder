import { createAction, props } from '@ngrx/store';


export const setStyle = createAction('[AppComponent] setStyle', props<{list, data}>())
export const getStyle = createAction('[AppComponent] getStyle')
