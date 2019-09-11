import { Action } from "@ngrx/store";

export let DATAAPP = '[App] Dataapp';

// console.log("heyaaaa");
export class DataappAction implements Action {
    readonly type = DATAAPP;
    constructor( public payload: object){}
}

export type actions = DataappAction;