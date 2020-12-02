import {DateHelpers} from '../class/date-helpers';
import {constantes} from '../../../constantes/constantes';
import {i18nConstantes} from '../../../constantes/i18n-constantes';
import '@angular/common/locales/global/fr';
import {Helpers} from '../class/helpers';
import {Roles} from '../../../constantes/roles';
import {ServiceUtils} from '../service/service-utils.service';
import {Directive, OnDestroy, OnInit} from '@angular/core';


/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */
@Directive()
export abstract class ComponentCommon implements OnInit, OnDestroy {
  readonly constantes = constantes;
  readonly i18nConstantes = i18nConstantes;
  readonly dateHelpers = DateHelpers;
  readonly helpers = Helpers;
  readonly rolesConstantes = Roles;
  visibleConfirmPassword = false;
  deleteAllConfirmDialogMessage = '';
  deleteConfirmDialogHeader = '';
  deleteConfirmDialogMessage = '';
  event: Event;

  yesLabel: string;
  noLabel: string;
  errorMessage: string;

  protected constructor(public serviceUtils: ServiceUtils,
                        public i18nBase?: string) {
  }

  get isValidPassword(): boolean {
    return this.serviceUtils
      && this.serviceUtils.userConfigurationService
      && this.serviceUtils.userConfigurationService.isValidPassword;
  }

  get lastPasswordObject(): {password: string} {
    return {password: this.serviceUtils
        && this.serviceUtils.userConfigurationService
        && this.serviceUtils.userConfigurationService.password};
  }

  get lastPassword(): string {
    return this.serviceUtils
      && this.serviceUtils.userConfigurationService
      && this.serviceUtils.userConfigurationService.password;
  }

  ngOnInit(): void {
    this.getLabels();
  }

  ngOnDestroy(): void {
  }

  getLabels(): void {
    this.serviceUtils.translate.get(this.i18nConstantes.yes).toPromise().then(value => this.yesLabel = value);
    this.serviceUtils.translate.get(this.i18nConstantes.no).toPromise().then(value => this.noLabel = value);
    this.serviceUtils.translate.get(this.i18nConstantes.deleteAllConfirmDialogMessage)
      .toPromise().then(value => this.deleteAllConfirmDialogMessage = value);
    this.serviceUtils.translate.get(this.i18nConstantes.deleteConfirmDialogHeader)
      .toPromise().then(value => this.deleteConfirmDialogHeader = value);
    this.serviceUtils.translate.get(this.i18nConstantes.deleteConfirmDialogMessage)
      .toPromise().then(value => this.deleteConfirmDialogMessage = value);

    this.serviceUtils.translate.get(i18nConstantes.errorMessage).toPromise().then(value => this.errorMessage = value);
  }

  i18nElement(value: string): string {
    return this.i18nBase + '.' + value;
  }

  promiseI18nElement(value: string, params?: object): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nElement(value), params).toPromise();
  }

  i18nError(value: string): string {
    return this.i18nBase + '.errors.' + value;
  }

  i18nReqError(value: string): string {
    return this.i18nBase + '.errors.req' + value.charAt(0).toLocaleUpperCase() + value.substring(1, value.length);
  }

  fieldLabel(value: string): string {
    return this.i18nBase + '.fields.' + value;
  }

  deleteLabel(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.delete).toPromise();
  }

  editLabel(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.edit).toPromise();
  }

  updateLabel(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.update).toPromise();
  }

  addLabel(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.add).toPromise();
  }

  cancelLabel(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.cancel).toPromise();
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  hasRole(role: string): boolean {
    if (!this.serviceUtils) {
      return false;
    }
    return this.helpers.hasRole(this.serviceUtils.authProvider.getEnvService().rolesSubject.value, role);
  }

  hasEveryRoles(roles: string[]): boolean {
    if (!this.serviceUtils) {
      return false;
    }
    return Helpers.hasEveryRoles(this.serviceUtils.authProvider.getEnvService().rolesSubject.value, roles);
  }

  haseSomeRoles(roles: string[]): boolean {
    if (!this.serviceUtils) {
      return false;
    }
    return Helpers.haseSomeRoles(this.serviceUtils.authProvider.getEnvService().rolesSubject.value, roles);
  }

  async shoWConfirmDialog(message: Promise<string> | string, header: Promise<string> | string, commande: () => any): Promise<void> {
    this.serviceUtils.confirmationService.confirm({
      message: (message instanceof Promise) ? await message : message,
      header: (header instanceof Promise) ? await header : header,
      acceptLabel: this.yesLabel,
      rejectLabel: this.noLabel,
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => commande(),
      reject: () => {
      },
      key: this.constantes.deleteConfirmDialogKey,
    });
  }

  async confirmPopup(event: Event,
                     message: Promise<string> | string,
                     accept: () => any,
                     reject?: () => any,
                     acceptLabel: Promise<string> | string = this.yesLabel,
                     rejectLabel: Promise<string> | string = this.noLabel,
                     icon: Promise<string> | string = this.constantes.warningIcon): Promise<void> {
    console.log('Class: ComponentCommon, Function: confirmPopup, Line 148 , event: '
    , event);
    this.serviceUtils.confirmationService.confirm({
      target: event.target,
      message:  await message,
      acceptLabel: await acceptLabel,
      rejectLabel: await rejectLabel,
      icon: await icon,
      accept,
      reject,
    });
  }

  enablePasswordConfirmation(data?: any): void {
    this.visibleConfirmPassword = true;
  }

  disablePasswordConfirmation(): void {
    this.visibleConfirmPassword = false;
  }
}
