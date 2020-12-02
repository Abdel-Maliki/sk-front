import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserListRoutingModule} from './user-list-routing.module';
import {UserListComponent} from './user-list.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {UserFormModule} from '../user-form/user-form.module';
import {UpdatePasswordModule} from '../../../../../front/component/update-password/update-password.module';
import {FormsModule} from '@angular/forms';
import {CanActiveUser} from '../../service/can-active-user';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    UserFormModule,
    UpdatePasswordModule,
    FormsModule
  ],
  providers: [CanActiveUser],
})
export class UserListModule {
}
