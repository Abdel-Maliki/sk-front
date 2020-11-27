import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogListRoutingModule } from './log-list-routing.module';
import {LogListComponent} from './log-list.component';
import {SharedModule} from '../../../../../shared/shared.module';


@NgModule({
  declarations: [LogListComponent],
  imports: [
    CommonModule,
    LogListRoutingModule,
    SharedModule,
  ]
})
export class LogListModule { }
