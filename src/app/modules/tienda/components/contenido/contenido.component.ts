import { Component, OnInit } from '@angular/core';
import { FactoryModelService } from './../../../../services/factory-model.service';
import { ProductoService } from './../../../../services/producto';
import { Store } from '@ngrx/store';
import { APPINT } from 'app/redux/interfasapp';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {
  public listproductpres: any = [];
  public disableindex: boolean = false;
  public app: any = {};
  public query: any={
    where:{
      opcion: "activo"
    },
    limit: 12
  }
  constructor(
    private _model: FactoryModelService,
    private _producto: ProductoService,
    private store: Store<APPINT>
  ) {
    // console.log(this._model.app);
    this.app = this._model.app;
    this.store.select('name')
    .subscribe(
      (res:any)=>{
        // console.log(res);
        if(res) this.query.where.empresa = res.id;
      }
    );
    this.getproduct();
  }
  ngOnInit(){

  }
  getproduct(){
    return this._producto.get(this.query)
    .subscribe(
      (res: any)=>{
        this.disableindex = !this.disableindex;
        res = res.data;
        this.listproductpres = res;
      }
    )
    ;
  }
}
