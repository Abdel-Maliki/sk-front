import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogDisplayComponent } from './log-display.component';
import {SharedModule} from '../../../../../shared/shared.module';



@NgModule({
  declarations: [LogDisplayComponent],
  exports: [
    LogDisplayComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LogDisplayModule { }
