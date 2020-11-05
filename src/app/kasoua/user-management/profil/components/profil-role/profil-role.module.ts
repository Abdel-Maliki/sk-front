import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoleComponent } from './profil-role.component';
import {SharedModule} from '../../../../../shared/shared.module';



@NgModule({
  declarations: [ProfilRoleComponent],
  exports: [
    ProfilRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfilRoleModule { }
