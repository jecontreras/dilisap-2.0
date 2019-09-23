import { Injectable } from '@angular/core';
import { FactoryModelService } from './factory-model.service'

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
  getcart(query: any){
    return this._model.query('cart/getcompleto', query);
  }
  saved (query: any){
    return this._model.create('cart', query);
  }
  savedarticulo(query: any){
    return this._model.create('cartarticulo', query);
  }
  generate(query: any){
    return this._model.create('cart/generateCar', query);
  }
  validarart(query: any){
    return this._model.create('cart/validarart', query);
  }
  edit(query:any){
    return this._model.update('cart', query.id, query);
  }

  cart_articulos(query:any, res:any){
    for(let item of query.articulo){
      if(item.id){
        let data = {
          articulo: item.id,
          cart: res.id,
          cantidad: item.cantidad,
          valor: item.costo,
          comision: item.costo_comison,
          empresa: item.empresa.id
        };
        return this.cart_next(data);
      }
    }
  }
  cart_next(query){
    return this._model.create('cartarticulo', query)
    .subscribe(res=>console.log(res));
  }

}
