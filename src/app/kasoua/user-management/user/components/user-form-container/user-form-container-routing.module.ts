import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserFormResolver} from '../../resolver/user-form-resolver';
import {UserFormContainerComponent} from './user-form-container.component';

const routes: Routes = [
  {
    path: '', component: UserFormContainerComponent, resolve: {data: UserFormResolver}
  },
  {
    path: ':id', component: UserFormContainerComponent, resolve: {data: UserFormResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFormContainerRoutingModule {
}
