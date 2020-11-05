import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListModule),
  },
  {
    path: 'form',
    loadChildren: () => import('./components/user-form-container/user-form-container.module').then(m => m.UserFormContainerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
