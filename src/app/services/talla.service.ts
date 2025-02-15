import { Injectable } from '@angular/core';
import { FactoryModelService } from './factory-model.service'

@Injectable({
  providedIn: 'root'
})
export class TallaService {
  cuerpo: any = {};
  constructor(
    private _model: FactoryModelService
  ) {
    this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('talla', query);
  }
  saved (query: any){
    return this._model.create('talla', query);
  }
  edit(query:any){
    return this._model.update('talla', query.id, query);
  }
}
