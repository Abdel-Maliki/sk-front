import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstantes} from '../../../../environments/route-constantes';

const routes: Routes = [
  {
    path: RouteConstantes.LIST,
    loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListModule),
  },
  {
    path: RouteConstantes.FORM,
    loadChildren: () => import('./components/user-form-container/user-form-container.module').then(m => m.UserFormContainerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
