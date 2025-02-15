import { Injectable } from '@angular/core';
import { FactoryModelService } from './factory-model.service'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cuerpo: any = {};
  constructor(
    private _model: FactoryModelService
  ) {
    this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('cart', query);
  }
  saved (query: any){
    return this._model.create('cart', query);
  }
  getcart(query: any){
    return this._model.query('cart/getcompleto', query);
  }
  edit(query: any){
    return this._model.update('cart', query.id, query);
  }
}
