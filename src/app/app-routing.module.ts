import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './front/component/login/login.component';
import {AuthGuard} from './front/service/auth-guard';
import {LoginGuard} from './front/service/login-guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuard]
  },
  { path: '',   redirectTo: '/user-management/profils/list', pathMatch: 'full' },
  /*{

    path: '',
    loadChildren: () => import('./kasoua/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard]
  },*/
  {
    path: 'user-management',
    loadChildren: () => import('./kasoua/user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
