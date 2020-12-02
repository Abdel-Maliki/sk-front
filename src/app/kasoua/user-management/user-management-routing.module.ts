import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteConstantes} from '../../../environments/route-constantes';

const routes: Routes = [
  {
    path: RouteConstantes.PROFIL,
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule),
  },
  {
    path: RouteConstantes.USER,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: RouteConstantes.LOG,
    loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
