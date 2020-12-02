import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogListRoutingModule } from './log-list-routing.module';
import {LogListComponent} from './log-list.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {LogDisplayModule} from '../log-display/log-display.module';
import {CanActiveLog} from '../../service/can-active-log';


@NgModule({
  declarations: [LogListComponent],
  imports: [
    CommonModule,
    LogListRoutingModule,
    SharedModule,
    LogDisplayModule,
  ],
  providers: [CanActiveLog]
})
export class LogListModule { }
