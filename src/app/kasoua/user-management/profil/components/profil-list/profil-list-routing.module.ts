import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfilListComponent} from './profil-list.component';
import {ProfilListResolver} from '../../resolver/profil-list-resolver';

const routes: Routes = [
  {
    path: '', component: ProfilListComponent, resolve: {data: ProfilListResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilListRoutingModule { }
