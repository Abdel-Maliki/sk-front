import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./kasoua/user-management/user-management.module').then(m => m.UserManagementModule),
  },
  {
    path: 'user-management',
    loadChildren: () => import('./kasoua/user-management/user-management.module').then(m => m.UserManagementModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
