import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './user-list.component';
import {UserListResolver} from '../../resolver/user-list-resolver';

const routes: Routes = [
  {
    path: '', component: UserListComponent, resolve: {data: UserListResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
