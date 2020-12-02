import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {MenuItem} from 'primeng/api';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {UserDomain, UserState} from '../../domain/user-domain';
import {InterfaceUser} from '../../service/interface-user';
import {UserProvider} from '../../service/user-provider';
import {UserFormComponent} from '../user-form/user-form.component';
import {MenuItemImp} from '../../../../../common/class/menu-item-imp';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';
import {UpdatePasswordComponent} from '../../../../../front/component/update-password/update-password.component';
import {ResponseWrapper} from '../../../../../common/class/response-wrapper';

export enum Action {
  ENABLE = 'ENABLE',
  ENABLE_ALL = 'ENABLE_ALL',
  DISABLE = 'DISABLE',
  DISABLE_ALL = 'DISABLE_ALL',
  RESET = 'RESET',
  DELETE = 'DELETE',
  DELETE_ALL = 'DELETE_ALL',
  FOR_ACTION = 'FOR_ACTION',
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractListComponent<UserDomain, InterfaceUser, UserProvider, UserFormComponent>
  implements OnInit, OnDestroy {

  formLink = 'user-management/users/form';
  readonly ACTIVE_ITEM: MenuItem = new MenuItemImp(this.promiseI18nElement('activateAccount'), 'fa fa-check-circle fa-lg',
    () => this.enablePasswordConfirmation(Action.ENABLE));
  readonly DISABLE_ITEM: MenuItem = new MenuItemImp(this.promiseI18nElement('disableAccount'), 'fa fa-ban fa-lg',
    () => this.enablePasswordConfirmation(Action.DISABLE));
  readonly RESET_PASSWORD: MenuItem = new MenuItemImp(this.promiseI18nElement('resetPassword'), 'fa fa-key fa-lg',
    () => this.enablePasswordConfirmation(Action.RESET));
  readonly DELETE_ITEM: MenuItem = new MenuItemImp(this.deleteLabel(),
    'fa fa-trash fa-lg', () => this.enablePasswordConfirmation(Action.DELETE));

  activateMessage: string;
  activateLabel: string;
  disableLabel: string;
  blockedLabel: string;
  disableMessage: string;
  activateAllMessage: string;
  disableAllMessage: string;
  activateAllAccountHeader: string;
  disableAllAccountHeader: string;
  confirmPassWord: string;
  addUserHeader: string;
  editUserHeader: string;
  resetPasswordMessage: string;
  haseActiveRole = false;
  haseDisabledRole = false;
  haseResetPassword = false;
  userState = UserState;
  @ViewChild('updatePasswordComponent') updatePasswordComponent: UpdatePasswordComponent;
  showUpdatePasswordDialog = false;
  visibleConfirmPassword = false;
  passwordMinLength = 5;
  action = Action;
  currentAction: Action;

  constructor(provider: UserProvider,
              serviceUtils: ServiceUtils) {
    super(provider, serviceUtils, i18nConstantes.userBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
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
    super.ngOnDestroy();
  }

  getNewInstance(): UserDomain {
    return new UserDomain();
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
    this.promiseI18nElement('addUserHeader').then(value => this.addUserHeader = value);
    this.promiseI18nElement('editUserHeader').then(value => this.editUserHeader = value);
    this.serviceUtils.translate.get('confirmPassWord').toPromise().then(value => this.confirmPassWord = value);
    super.getLabels();
  }

  getHeader(): string {
    return this.currentAction === Action.ENABLE
      ? `${this.i18nBase}.activateAccountHeader`
      : this.currentAction === Action.DISABLE
        ? `${this.i18nBase}.disableAccountHeader`
        : this.currentAction === Action.ENABLE_ALL
          ? `${this.i18nBase}.activateAllAccountHeader`
          : this.currentAction === Action.DISABLE_ALL
            ? `${this.i18nBase}.disableAllAccountHeader`
            : this.currentAction === Action.RESET
              ? `${this.i18nBase}.resetPasswordHeader`
              : this.currentAction === Action.DELETE
                ? `${this.i18nBase}.deleteAccountHeader`
                : this.currentAction === Action.DELETE_ALL
                  ? `${this.i18nBase}.deleteAllAccountHeader`
                  : '';
  }

  validateButtonLabel(): string {
    return this.currentAction === Action.ENABLE
      ? `${this.i18nBase}.activateAccount`
      : this.currentAction === Action.DISABLE
        ? `${this.i18nBase}.disableAccount`
        : this.currentAction === Action.ENABLE_ALL
          ? `${this.i18nBase}.activateAccount`
          : this.currentAction === Action.DISABLE_ALL
            ? `${this.i18nBase}.disableAccount`
            : this.currentAction === Action.RESET
              ? `reset`
              : this.currentAction === Action.DELETE
                ? `delete`
                : this.currentAction === Action.DELETE_ALL
                  ? `delete`
                  : '';
  }

  showItemContextMenu(entity: UserDomain): boolean {
    return entity && entity.userName !== this.constantes.profileAdmin;
  }

  async disableAccount(): Promise<void> {
    await this.provider.getEnvService().disableAccount(this.pagination, this.entity.id, this.lastPassword);
  }

  async activateAccount(): Promise<void> {
    await this.provider.getEnvService().activateAccount(this.pagination, this.entity.id, this.lastPassword);
  }

  async disableAllAccount(): Promise<void> {
    await this.provider.getEnvService().disableAllAccount(this.validateEntries(), this.pagination, this.lastPassword);
  }

  async activateAllAccount(): Promise<void> {
    await this.provider.getEnvService().activateAllAccount(this.validateEntries(), this.pagination, this.lastPassword);
  }

  async resetPassword(): Promise<void> {
    await this.provider.getEnvService().resetPassword(this.entity.id, this.lastPassword);
    await this.serviceUtils.notificationService.showSuccess();
  }

  async rebuildMenuItem(entity: UserDomain): Promise<void> {
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
      this.modalItems.push(this.DELETE_ITEM);
    }
    if (this.haseResetPassword) {
      this.modalItems.push(this.RESET_PASSWORD);
    }
  }

  resetPasswordConfirmation(): void {
    this.shoWConfirmDialog(
      this.resetPasswordMessage,
      this.promiseI18nElement('resetPasswordHeader', {userName: this.entity.userName}),
      () => this.resetPassword()
    ).then();
  }

  async validateAction(): Promise<void> {
    if (!this.currentAction) {
      return;
    }

    switch (this.currentAction) {
      case Action.ENABLE:
        await this.activateAccount();
        this.disablePasswordConfirmation();
        break;
      case Action.ENABLE_ALL:
        await this.activateAllAccount();
        this.disablePasswordConfirmation();
        break;
      case Action.DISABLE:
        await this.disableAccount();
        this.disablePasswordConfirmation();
        break;
      case Action.DISABLE_ALL:
        await this.disableAllAccount();
        this.disablePasswordConfirmation();
        break;
      case Action.DELETE:
        await this.deleteAndGet(this.entity, this.lastPasswordObject);
        this.disablePasswordConfirmation();
        break;
      case Action.DELETE_ALL:
        await this.deleteAllAndGet(this.selectedEntities, this.pagination, this.lastPasswordObject);
        this.disablePasswordConfirmation();
        break;
      case Action.RESET:
        await this.resetPassword();
        this.disablePasswordConfirmation();
        break;
      case Action.FOR_ACTION:
        await this
          .saveOrUpdate(this.lastPasswordObject)
          .then(() => this.disablePasswordConfirmation())
          .catch((reason: ResponseWrapper<any>) => {
            if (reason.error && reason.error.message && reason.error.message !== this.provider.getEnvService().INVALID_PASSWORD_MESSAGE) {
              this.disablePasswordConfirmation();
            }
          });
        break;
      default:
        this.helpers.fail(this.currentAction);
    }
  }

  /*activeMultipleConfirmation(): void {
    this.shoWConfirmDialog(this.activateAllMessage, this.activateAllAccountHeader, this.activateAllAccount).then();
  }

  disaleMultipleConfirmation(): void {
    this.shoWConfirmDialog(this.disableAllMessage, this.disableAllAccountHeader, this.disableAllAccount).then();
  }*/

  showContextMenuOption(): boolean {
    return this.haseResetPassword
      || this.haseEditRole
      || this.haseDeleteRole
      || (this.haseActiveRole && this.provider.getEnvService().entities$.value.some(value => value.status === UserState.DESACTIVE))
      || (this.haseDisabledRole && this.provider.getEnvService().entities$.value.some(value => value.status === UserState.ACTIVE));
  }

  enablePasswordConfirmation(action: Action): void {
    this.currentAction = action;
    this.visibleConfirmPassword = true;
  }

  disablePasswordConfirmation(): void {
    this.visibleConfirmPassword = false;
  }

  enableUpdatePasswordDialog(): void {
    this.showUpdatePasswordDialog = true;
  }

  disableUpdatePasswordDialog(): void {
    this.showUpdatePasswordDialog = false;
  }
}
