import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilListComponent } from './profil-list.component';
import {ProfilListRoutingModule} from './profil-list-routing.module';
import {SharedModule} from '../../../../../shared/shared.module';
import {ProfilFormModule} from '../profil-form/profil-form.module';
import {ProfilRoleModule} from '../profil-role/profil-role.module';
import {CanActiveProfil} from '../../service/can-active-profil';


@NgModule({
  declarations: [ProfilListComponent],
  imports: [
    CommonModule,
    ProfilListRoutingModule,
    SharedModule,
    ProfilFormModule,
    ProfilRoleModule,
  ],
  providers: [CanActiveProfil],
})
export class ProfilListModule { }
