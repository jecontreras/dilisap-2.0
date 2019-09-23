import { Injectable } from '@angular/core';
import { FactoryModelService } from './factory-model.service'

@Injectable({
  providedIn: 'root'
})
export class GuiasService {
  cuerpo: any = {};
  constructor(
    private _model: FactoryModelService
  ) {
    this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('guias', query);
  }
  saved (query: any){
    return this._model.create('guias', query);
  }
  edit(query:any){
    return this._model.update('guias', query.id, query);
  }
}
