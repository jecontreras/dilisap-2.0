import { Component, OnInit } from '@angular/core';
import { ColoresService } from '../../../services/colores.service';
import { ToolsService } from '../../../services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import swal from 'sweetalert';
import { GLOBAL } from '../../../services/global';
import { FactoryModelService } from '../../../services/factory-model.service';
import { GuiasService } from 'app/services/guias.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent implements OnInit {

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

  constructor(
    private _guias: GuiasService,
    private _tools: ToolsService,
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
    this.query.sort ='createdAt DESC';
    this._guias.get(this.query)
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
      this.data = data;
    }else{
      this.clone = {};
      this.data = {
        empresa: this.user.empresa
      };
    }
  }
  saved(){
    const
      query: any = this.data
    ;
    if(query.guia){
      query.slug = _.kebabCase(query.guia)
      this._guias.saved(query)
      .subscribe(
        (res: any)=>{
          // console.log(res);
          if(res){
            this.data = {};
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
      swal("Fallo!", "Error Agrege un Titulo!", "error");
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
          this._guias.edit(query)
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

}
