import { Action } from "@ngrx/store";

export const DATAAPP = '[App] Dataapp';


export class DataappAction implements Action {
    readonly type = DATAAPP;
    constructor( public payload: object){}
}

export type actions = DataappAction;