import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormContainerRoutingModule } from './user-form-container-routing.module';
import { UserFormContainerComponent } from './user-form-container.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {UserFormModule} from '../user-form/user-form.module';


@NgModule({
  declarations: [UserFormContainerComponent],
  imports: [
    CommonModule,
    UserFormContainerRoutingModule,
    SharedModule,
    UserFormModule
  ]
})
export class UserFormContainerModule { }
