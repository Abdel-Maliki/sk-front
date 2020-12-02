import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteConstantes} from '../../../../environments/route-constantes';

const routes: Routes = [
  {
    path: RouteConstantes.LIST,
    loadChildren: () => import('./components/log-list/log-list.module').then(m => m.LogListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
