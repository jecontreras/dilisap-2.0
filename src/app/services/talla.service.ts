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
  pushfile(obj: any) {
    console.log(this._model);
    const
      form = new FormData()
    ;
    // tslint:disable-next-line:quotemark
    if (obj) {
      form.append('file', obj[0]);
      return this._model.create('articulo/file', form);
    } else {
      // cuerpo._tools.openSnack('Error', false);
    }
  }
  deletefile(obj: any ) {
    if (obj) {
      return this._model.get('user/deletefile', {
        name: obj
      })
      ;
    }
  }
}
