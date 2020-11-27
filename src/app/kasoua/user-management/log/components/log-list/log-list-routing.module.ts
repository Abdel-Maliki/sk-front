import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogListComponent} from './log-list.component';
import {LogListResolver} from '../../resolver/log-list-resolver';

const routes: Routes = [
  {
    path: '', component: LogListComponent, resolve: {data: LogListResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogListRoutingModule { }
