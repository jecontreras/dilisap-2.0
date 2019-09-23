import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import swal from 'sweetalert';
import { GLOBAL } from '../../../services/global';
import { FactoryModelService } from '../../../services/factory-model.service';
import { CartService } from 'app/services/cart.service';
import { ProductoService } from 'app/services/producto';
import { UsuariosService } from 'app/services/usuarios.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  public disable: boolean = false;
  public data: any = {};
  public list: any = [];
  public clone: any = [];
  public user: any = {};
  public count: any = 0;
  public searcht: any ={
    txt: ''
  };
  public query: any = {where:{}};
  public list_product: any = [
    {}
  ]
  constructor(
    private _factura: CartService,
    private _tools: ToolsService,
    private _usuer: UsuariosService,
    private _producto: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private _model: FactoryModelService,
  ) { }

  ngOnInit() {
    this.user = this._model.user;
    if(this._model.user.rol.nombre !== "super admin" && this._model.user.rol.nombre !== "admin"){
      this.router.navigate(['admin/dashboard']);
    }
    const
      paginate: any = {
        pageIndex: 0,
        pageSize: 10
      }
    ;
    this.getlist(paginate);
  }
  pageEvent(ev){
    // console.log(ev);
    ev.pageSize = 10;
    this.getlist(ev);
  }
  getsearh(){
    const
      paginate: any = {
        pageIndex: 0,
        pageSize: 10
      }
    ;
    if(this.searcht.txt){
      this.query.where.or = [
        {
          color:{
            contains: this.searcht.txt || ''
          }
        }
      ];
    }else{
      delete this.query.where.or;
    }
    this.list = [];
    // console.log(this.query);
    this.getlist(paginate);
  }
  getlist(paginate: any){
    this.query.limit = paginate.pageSize;
    this.query.skip = paginate.pageIndex;
    //console.log(this.query);
    // this.query.where.estado = 'activo';
    if(this.user.rol.nombre !== "super admin"){
      this.query.where.user = this.user.id;
    }
    this.query.sort ='createdAt DESC';
    this._factura.get(this.query)
    .subscribe(
      (res: any)=>{
        // console.log(res.data);
        this.count = res.count;
        this.list = _.unionBy(this.list || [], res.data, 'id');
      }
    )
    ;
  }

  add(data: any){
    this.disable = !this.disable;
    if(data){
      this.clone = _.clone(data);
      this.get_art(data);
      this.data = data;
      // console.log(this.data);
    }else{
      this.clone = {};
      this.data = {
        codigo: this.codigo(),
        user: {},
        estado: "completado",
        empresa: this.user.empresa
      };
    }
  }
  get_art(data){
    return this._factura.getcart({
      where:{
        id: data.id
      }
    })
    .subscribe(
      (res:any)=>{
        // console.log(res);
        res = res.data;
        if(res){
          this.data = res;
          this.list_product = [];
          for(let item of res.articulo){
            this.list_product.push({
              codigo: item.articulo.codigo,
              cantidad: item.cantidad,
              costo: item.valor,
              costo_comison: item.comision
            });
          }
        }
      }
    );
  }


  saved(){
    this.data.articulo = this.list_product;
    let
      query: any = this.data
    ;
    if(query.user.id && this.user.rol.nombre === 'super admin'){
      query.user = query.user.id;
      this.conversiones();
      this._factura.saved(query)
      .subscribe(
        (res: any)=>{
          this._factura.cart_articulos(query, res)
          if(res){
            this.data = {};
            this.list_product = [];
            this.list.push(res);
            swal("Completado!", "Agregado Correctamente!", "success");
            this.disable = !this.disable;
          }else{
            swal("Fallo!", "Error al Agregar!", "error");
          }
        }
      )
      ;
    }else{
      swal("Fallo!", "Error Agrege un Usuario!", "error");
    }
  }
  blur(opt: string){
    // console.log(opt, this.clone, this.data);
    if(this.data[opt] !== this.clone[opt]){
      const
        query : any = {
          id: this.data.id
        }
        ;
        query[opt] = this.data[opt];
        if(query.id){
          this._factura.edit(query)
          .subscribe(
            (res: any)=>{
              // console.log(res);
              if(res){
                this._tools.openSnack('Actualizado '+opt, 'Ok', false);
              }
            }
          )
          ;
        }
    }
  }

  get_product(idx: number){
   let list_art = this.list_product[idx];
   if(!list_art) return "no Encotrado";

   if(list_art.codigo){
    this.get_articulo(list_art.codigo)
    .subscribe(
     (articulo:any)=>{
       articulo = articulo.data[0];
       if(!articulo) {
          this._tools.openSnack('Articulo no Encotrado','Error', false);
          return "no Encontrado db" ;
       }
      //  console.log(articulo);
       list_art = {
         codigo: list_art.codigo,
         cantidad: 1,
         id: articulo.id,
         empresa: articulo.empresa,
         costo: articulo.costoventa,
         costocomision: articulo.costocomision,
         costo_comison: articulo.costocomision,
         costo_art: articulo.costoventa,
         costo_comison_art:articulo.costocomision,
       };
       this.list_product[idx] = list_art;
       this.list_product.push({});
       this._tools.openSnack('Producto Encontrado','Ok', false);
       this.conversiones();
      }
    );
   }else{
    this._tools.openSnack('Error Colocar Codigo del Producto','Error', false);
   }

  }
  conversiones(){
    let costo:number = 0;
    let costo_comison:number = 0;
    for(let item of this.list_product){
      if(item.costo_comison_art && item.costo_art && item.cantidad){
        // console.log(item)
        item.costo = parseInt(item.costo_art) * parseInt(item.cantidad);
        item.costo_comison = parseInt(item.cantidad)*parseInt(item.costo_comison_art);
        costo+=parseInt(item.costo);
        costo_comison+=parseInt(item.costo_comison);
      }
    }
    this.data.total = costo;
    this.data.costo_comision = costo_comison;
  }
  get_articulo(txt:string){
    return this._producto.get({
      where:{
        codigo: txt
      }
    });
  }
  get_vendedor(){
    // console.log(this.data.user.username)
    return this._usuer.get({
      where:{
        username: this.data.user.username
      }
    })
    .subscribe(
      (user: any)=>{
        // console.log(user);
        user = user.data[0];
        if(user){
          this.data.user = user;
        }else{
          this._tools.openSnack('Vendedor no Encotrado','Error', false);
        }
      }
    );
  }
  codigo() {
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }

}
