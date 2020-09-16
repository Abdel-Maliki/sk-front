import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule),
  },
  {
    path: 'profils',
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
