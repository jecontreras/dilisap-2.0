// app.ts
import { Action } from '@ngrx/store';
import { DATAAPP, actions } from './app.actions';

let initialState = {};

export function appReducer(state: object = initialState, action: actions) {
  if(JSON.parse(localStorage.getItem('DATAAPP'))) initialState = JSON.parse(localStorage.getItem('DATAAPP'));
  switch (action.type) {
    case DATAAPP:{
        // console.log(action);
        localStorage.removeItem('DATAAPP');
        localStorage.setItem('DATAAPP', JSON.stringify(action.payload));
        return action.payload;
    }

    default: return state;
  }
}