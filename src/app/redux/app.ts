// app.ts
import { Action } from '@ngrx/store';
import { DATAAPP, actions } from './app.actions';

const initialState = {};

export function appReducer(state: object = initialState, action: actions) {
  switch (action.type) {
    case DATAAPP:{
        console.log(action);
        return action.payload;
    }

    default:
      return state;
  }
}