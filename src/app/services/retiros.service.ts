import { Injectable } from '@angular/core';
import { FactoryModelService } from './factory-model.service'

@Injectable({
  providedIn: 'root'
})
export class RetirosService {
  cuerpo: any = {};
  constructor(
    private _model: FactoryModelService
  ) {
    this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('retiros', query);
  }
  saved (query: any){
    return this._model.create('retiros', query);
  }
  edit(query:any){
    return this._model.update('retiros', query.id, query);
  }
  saved_retiro (query: any){
    return this._model.create('retiros/generate', query);
  }
}
