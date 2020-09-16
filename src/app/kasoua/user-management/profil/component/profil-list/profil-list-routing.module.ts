import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfilListResolverService} from '../../resolver/profil-list-resolver.service';
import {ProfilListComponent} from './profil-list.component';

const routes: Routes = [
  {
    path: '', component: ProfilListComponent, resolve: {data: ProfilListResolverService}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilListRoutingModule { }
