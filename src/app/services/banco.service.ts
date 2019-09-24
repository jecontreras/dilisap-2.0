import { Injectable } from '@angular/core';
import { FactoryModelService } from './factory-model.service'

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  cuerpo: any = {};
  constructor(
    private _model: FactoryModelService
  ) {
    this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('bancos', query);
  }
  saved (query: any){
    return this._model.create('bancos', query);
  }
  edit(query:any){
    return this._model.update('bancos', query.id, query);
  }
}
