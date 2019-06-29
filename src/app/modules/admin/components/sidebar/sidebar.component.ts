import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/admin/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/admin/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/admin/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/admin/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/admin/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/admin/clientes', title: 'Clientes',  icon:'group', class: '' },
    { path: '/admin/productos', title: 'Productos',  icon:'local_mall', class: '' },
    { path: '/admin/categorias', title: 'Categorias',  icon:'style', class: '' },
    { path: '/admin/marcas', title: 'Marcas',  icon:'class', class: '' },
    { path: '/admin/color', title: 'Color',  icon:'invert_colors', class: '' },
    { path: '/admin/tallas', title: 'Tallas',  icon:'pregnant_woman', class: '' },
    { path: '/admin/factura', title: 'Factura',  icon:'local_grocery_store', class: '' },
    { path: '/admin/empresa', title: 'Empresa',  icon:'store', class: '' },
    // { path: '/admin/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
