import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/profil-list/profil-list.module').then(m => m.ProfilListModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./components/profil-list/profil-list.module').then(m => m.ProfilListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
