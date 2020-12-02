import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogListComponent} from './log-list.component';
import {LogListResolver} from '../../resolver/log-list-resolver';
import {CanActiveLog} from '../../service/can-active-log';

const routes: Routes = [
  {
    path: '', component: LogListComponent, resolve: {data: LogListResolver},
    canActivate: [CanActiveLog],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogListRoutingModule { }
