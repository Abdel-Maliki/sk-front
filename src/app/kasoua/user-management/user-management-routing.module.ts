import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'profils',
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'logs',
    loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
