import { Component, OnInit } from '@angular/core';
import { ColoresService } from '../../../services/colores.service';
import { ToolsService } from '../../../services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import swal from 'sweetalert';
import { GLOBAL } from '../../../services/global';
import { FactoryModelService } from '../../../services/factory-model.service';
import { RetirosService } from 'app/services/retiros.service';
import { BancoService } from 'app/services/banco.service';
import { CartService } from 'app/services/cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'config_pagos',
  templateUrl: './config_pagos.component.html',
  styleUrls: ['./config_pagos.component.css']
})
export class Config_pagosComponent implements OnInit {

  public disable: boolean = false;;
  public user: any = {};
  public count: any = 0;
  public searcht: any ={
    txt: ''
  };
  public query: any = {where:{}};
  public baco_data: any = {};
  public retiro_data: any = {};
  public clone_banco: any = {};

  public list_banco: any = [];
  public list_retiro: any = [];

  public clone_retiro: any = {};

  public disable_banco: any = false;
  public disable_retiro: any = false;

  public ganancias:any = 0;

  constructor(
    private _colores: ColoresService,
    private _tools: ToolsService,
    private route: ActivatedRoute,
    private router: Router,
    private _model: FactoryModelService,
    private _banco: BancoService,
    private _retiro: RetirosService,
    private _cart: CartService
  ) {

    this.get_factura();
   }

  ngOnInit() {
    this.user = this._model.user;
    if(this._model.user.rol.nombre !== "super admin" && this._model.user.rol.nombre !== "admin"){
      this.router.navigate(['admin/dashboard']);
    }
    let paginate: any = {
      pageIndex: 0,
      pageSize: 10
    }
    this.get_retiro(paginate);
  }
  get_factura(){
    return this._cart.get({
      where:{
        estado: 'activo'
      },
      limit: -1
    })
    .subscribe((res:any)=>{
      res = res.data;
      let ganancias = 0;
      for(let item of res){
          if(item.costo_comision){
              ganancias+=item.costo_comision;
          }
      }
      this.ganancias = ganancias;
      console.log(this.ganancias);
    })
  }


  pageEvent(ev){
    // console.log(ev);
    ev.pageSize = 10;
    this.get_retiro(ev);
  }
  getsearh(){
    const
      paginate: any = {
        pageIndex: 0,
        pageSize: 10
      }
    ;
    if(this.searcht.txt){
      // this.query.where.or = [
      //   {
      //     color:{
      //       contains: this.searcht.txt || ''
      //     }
      //   }
      // ];
    }else{
      delete this.query.where.or;
    }
    this.list_retiro = [];
    // console.log(this.query);
    this.get_retiro(paginate);
  }

  get_banco(){
    this._banco.get({
      where:{
          user: this.user.id   
      },
      limit: -1
    })
    .subscribe(
      (res: any)=>{
        // console.log(res.data);
        this.list_banco = _.unionBy(this.list_banco || [], res.data, 'id');
      }
    )
    ;
  }
  get_retiro(paginate){
    this.query.limit = paginate.pageSize;
    this.query.skip = paginate.pageIndex;
    //console.log(this.query);
    // this.query.where.estado = 'activo';
    this.query.sort ='createdAt DESC';
    if(this.user.rol.nombre === 'super admin'){
      delete this.query.user;
    }
    this._retiro.get(this.query)
    .subscribe(
      (res: any)=>{
        // console.log(res.data);
        this.count = res.count;
        this.list_retiro = _.unionBy(this.list_retiro || [], res.data, 'id');
      }
    )
    ;
    this.get_banco();
  }

  add(data: any, opt){
    if(opt){
      this.disable_retiro = !this.disable_retiro;
      if(data){
        this.clone_retiro = _.clone(data);
        this.retiro_data = this.clone_retiro;
        this.retiro_data.banco = this.clone_retiro.banco.id;
      }else{
        this.clone_retiro = {};
        this.retiro_data = {
          codigo: this.codigo(),
          cantidad: this.ganancias,
          user: this.user.id,
          empresa: this.user.empresa
        };
      }
    }else{
      this.disable_banco = !this.disable_banco;
      if(data){
        this.clone_banco = _.clone(data);
        this.baco_data = data;
      }else{
        this.clone_banco = {};
        this.baco_data = {
          user: this.user.id,
          empresa: this.user.empresa
        };
      }
    }
  }
  saved_banco(){
    const
      query: any = this.baco_data
    ;
    if(query.banco){
      this._banco.saved(query)
      .subscribe(
        (res: any)=>{
          // console.log(res);
          if(res){
            this.baco_data = {};
            this.list_banco.push(res);
            swal("Completado!", "Agregado Correctamente!", "success");
            this.disable_banco = !this.disable_banco;
          }else{
            swal("Fallo!", "Error al Agregar!", "error");
          }
        }
      )
      ;
    }else{
      swal("Fallo!", "Error Agrege un Titulo!", "error");
    }
  }
  saved_retiro(){
    let
      query: any = this.retiro_data
    ;
    if(query){
      // console.log(query);
      this._retiro.saved_retiro(query)
      .subscribe(
        (res: any)=>{
          // console.log(res);
          if(res){
            this.retiro_data = {};
            this.list_retiro.push(res);
            swal("Completado!", "Agregado Correctamente!", "success");
            this.disable_retiro = !this.disable_retiro;
            location.reload();
          }else{
            swal("Fallo!", "Error al Agregar!", "error");
          }
        }
      )
      ;
    }else{
      swal("Fallo!", "Error Agrege un Titulo!", "error");
    }
  }
  blur(opt: string){
    // console.log(opt, this.clone, this.data);
    if(this.retiro_data[opt] !== this.clone_retiro[opt]){
      const
        query : any = {
          id: this.retiro_data.id
        }
        ;
        query[opt] = this.retiro_data[opt];
        if(query.id){
          this._retiro.edit(query)
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
  onBlur_banco(opt: string){
    if(this.baco_data[opt] !== this.clone_banco[opt]){
      const
        query : any = {
          id: this.baco_data.id
        }
        ;
        query[opt] = this.baco_data[opt];
        if(query.id){
          this._banco.edit(query)
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

  codigo() {
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }

  conversion(){
    if(this.ganancias >= this.retiro_data.cantidad){
      this.retiro_data.cantidad = parseInt(this.retiro_data.cantidad);
    }else{
      this.retiro_data.cantidad = parseInt(this.ganancias);
    }
  }

}
