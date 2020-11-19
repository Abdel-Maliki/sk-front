import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {MenuItem} from 'primeng/api';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {UserDomaine, UserState} from '../../domain/user-domaine';
import {InterfaceUser} from '../../domain/interface-user';
import {UserProvider} from '../../service/user-provider';
import {UserFormComponent} from '../user-form/user-form.component';
import {MenuItemImp} from '../../../../../common/class/menu-item-imp';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractListComponent<UserDomaine, InterfaceUser, UserProvider, UserFormComponent>
  implements OnInit, OnDestroy {

  formLink = 'user-management/users/form';
  readonly ACTIVE_ITEM: MenuItem = new MenuItemImp(this.promiseI18nElement('activateAccount'), 'fa fa-check-circle fa-lg',
    () => this.activeOneConfirmation());
  readonly DISABLE_ITEM: MenuItem = new MenuItemImp(this.promiseI18nElement('disableAccount'), 'fa fa-ban fa-lg',
    () => this.disableOneConfirmation());
  readonly RESET_PASSWORD: MenuItem = new MenuItemImp(this.promiseI18nElement('resetPassword'), 'fa fa-key fa-lg',
    () => this.resetPasswordConfirmation());

  activateMessage: string;
  activateLabel: string;
  disableLabel: string;
  blockedLabel: string;
  disableMessage: string;
  activateAllMessage: string;
  disableAllMessage: string;
  activateAllAccountHeader: string;
  disableAllAccountHeader: string;
  resetPasswordMessage: string;
  haseActiveRole = false;
  haseDisabledRole = false;
  haseResetPassword = false;
  userState = UserState;

  constructor(provider: UserProvider,
              serviceUtils: ServiceUtils) {
    super(provider, serviceUtils, i18nConstantes.userBase);
  }

  ngOnInit(): void {
    this.getLabels();
    this.checkRoles();
  }

  checkRoles(): void {
    this.haseAddRole = this.hasRole(this.rolesConstantes.ADD_USER);
    this.haseEditRole = this.hasRole(this.rolesConstantes.EDIT_USER);
    this.haseDeleteRole = this.hasRole(this.rolesConstantes.DELETE_USER);
    this.haseActiveRole = this.hasRole(this.rolesConstantes.ACTIVATE_ACCOUNT);
    this.haseDisabledRole = this.hasRole(this.rolesConstantes.DISABLED_ACCOUNT);
    this.haseResetPassword = this.hasRole(this.rolesConstantes.RESET_PASSWORD);
    super.checkRoles();
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  getNewInstance(): UserDomaine {
    return new UserDomaine();
  }

  getLabels(): void {
    this.promiseI18nElement('activateMessage').then(value => this.activateMessage = value);
    this.promiseI18nElement('disableMessage').then(value => this.disableMessage = value);
    this.promiseI18nElement('disableAllMessage').then(value => this.disableAllMessage = value);
    this.promiseI18nElement('activateAllMessage').then(value => this.activateAllMessage = value);
    this.promiseI18nElement('activateAllAccountHeader').then(value => this.activateAllAccountHeader = value);
    this.promiseI18nElement('disableAllAccountHeader').then(value => this.disableAllAccountHeader = value);
    this.promiseI18nElement('resetPasswordMessage').then(value => this.resetPasswordMessage = value);
    this.promiseI18nElement('activateLabel').then(value => this.activateLabel = value);
    this.promiseI18nElement('disableLabel').then(value => this.disableLabel = value);
    this.promiseI18nElement('blockedLabel').then(value => this.blockedLabel = value);
    super.getLabels();
  }

  showItemContextMenu(entity: UserDomaine): boolean {
    return entity && entity.userName !== this.constantes.profileAdmin;
  }

  async disableAccount(): Promise<void> {
    await this.provider.getEnvService().disableAccount(this.pagination, this.entity.id);
  }

  async activateAccount(): Promise<void> {
    await this.provider.getEnvService().activateAccount(this.pagination, this.entity.id);
  }

  async disableAllAccount(): Promise<void> {
    await this.provider.getEnvService().disableAllAccount(this.validateEntries(), this.pagination);
  }

  async activateAllAccount(): Promise<void> {
    await this.provider.getEnvService().activateAllAccount(this.validateEntries(), this.pagination);
  }

  async resetPassword(): Promise<void> {
    await this.provider.getEnvService().resetPassword(this.entity.id);
    await this.serviceUtils.notificationService.showSuccess();
  }

  async rebuidMenuItem(entity: UserDomaine): Promise<void> {
    this.modalItems = [];
    if (entity && entity.status === UserState.ACTIVE && this.haseDisabledRole) {
      this.modalItems = [this.DISABLE_ITEM];
    }
    if (entity && (entity.status === UserState.DESACTIVE || entity.status === UserState.BLOQUE) && this.haseActiveRole) {
      this.modalItems = [this.ACTIVE_ITEM];
    }
    if (this.haseEditRole) {
      this.modalItems.push(this.modalUpdateItem);
    }
    if (this.haseDeleteRole) {
      this.modalItems.push(this.deleteItem);
    }
    if (this.haseResetPassword) {
      this.modalItems.push(this.RESET_PASSWORD);
    }
  }

  activeOneConfirmation(): void {
    this.shoWConfirmDialog(
      this.activateMessage,
      this.promiseI18nElement('activateAccountHeader', {userName: this.entity.userName}),
      () => this.activateAccount(),
    ).then();
  }

  disableOneConfirmation(): void {
    this.shoWConfirmDialog(
      this.activateMessage,
      this.promiseI18nElement('disableAccountHeader', {userName: this.entity.userName}),
      () => this.disableAccount()
    ).then();
  }

  resetPasswordConfirmation(): void {
    this.shoWConfirmDialog(
      this.resetPasswordMessage,
      this.promiseI18nElement('resetPasswordHeader', {userName: this.entity.userName}),
      () => this.resetPassword()
    ).then();
  }

  activeMultipleConfirmation(): void {
    this.shoWConfirmDialog(this.activateAllMessage, this.activateAllAccountHeader, this.activateAllAccount).then();
  }

  disaleMultipleConfirmation(): void {
    this.shoWConfirmDialog(this.disableAllMessage, this.disableAllAccountHeader, this.disableAllAccount).then();
  }

  showcontextMenuOption(): boolean {
    return this.haseResetPassword
      || this.haseEditRole
      || this.haseDeleteRole
      || (this.haseActiveRole && this.provider.getEnvService().entities$.value.some(value => value.status === UserState.DESACTIVE))
      || (this.haseDisabledRole && this.provider.getEnvService().entities$.value.some(value => value.status === UserState.ACTIVE));
  }
}
