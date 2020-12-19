import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilFormRoutingModule } from './profil-form-routing.module';
import { ProfilFormComponent } from './profil-form.component';
import {SharedModule} from '../../../../../shared/shared.module';


@NgModule({
  declarations: [ProfilFormComponent],
  exports: [
    ProfilFormComponent
  ],
  imports: [
    CommonModule,
    ProfilFormRoutingModule,
    SharedModule,
  ]
})
export class ProfilFormModule { }
