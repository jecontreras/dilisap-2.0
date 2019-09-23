import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClienteComponent } from '../../cliente/cliente.component';
import { ProductosComponent } from '../../productos/productos.component';
import { FacturaComponent } from '../../factura/factura.component';
import { CategoriasComponent } from '../../categorias/categorias.component';
import { MarcasComponent } from '../../marcas/marcas.component';
import { ColorComponent } from '../../color/color.component';
import { ConfiguracionComponent } from '../../configuracion/configuracion.component';
import { TallasComponent } from '../../tallas/tallas.component';
import { EmpresaComponent } from '../../empresa/empresa.component';
import { MercadosComponent } from '../../mercados/mercados.component';
import { MyOwnCustomMaterialModule } from './../../../../app.material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { Config_pagosComponent } from '../../config-pagos/config_pagos.component';
import { GuiasComponent } from '../../guias/guias.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    AngularEditorModule,
    MatSelectModule,
    MyOwnCustomMaterialModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ClienteComponent,
    ProductosComponent,
    FacturaComponent,
    CategoriasComponent,
    MarcasComponent,
    ColorComponent,
    ConfiguracionComponent,
    TallasComponent,
    EmpresaComponent,
    GuiasComponent,
    Config_pagosComponent,
    MercadosComponent
  ]
})

export class AdminLayoutModule {}
