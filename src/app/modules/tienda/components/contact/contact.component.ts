import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FactoryModelService } from './../../../../services/factory-model.service';
import { Store } from '@ngrx/store';
import { APPINT } from 'app/redux/interfasapp';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public slug: any = {};
  public data: any = {};
  public app: any = {};
  public agente: any = {};

  constructor(
    private route: ActivatedRoute,
    private _model: FactoryModelService,
    private router: Router,
    private Store: Store<APPINT>
  ) {
    this.data = {};
    this.app = this._model.app;

    this.Store.select('name')
    .subscribe((name)=>{
      console.log(name);
      this.agente = name;
    });

  }
  ngOnInit(){
    this.route.params.subscribe(params => {
       if(params['id']!=null){
         this.slug = params['id'];
         console.log(params);
       }else{

       }
    });
  }
}
