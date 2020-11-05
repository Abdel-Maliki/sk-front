import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { UserFormComponent } from './user-form.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [UserFormComponent],
    exports: [
        UserFormComponent
    ],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    SharedModule,
    AutoCompleteModule,
    FormsModule
  ]
})
export class UserFormModule { }
