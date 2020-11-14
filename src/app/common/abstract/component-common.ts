import {DateHelpers} from '../class/date-helpers';
import {constantes} from '../../../environments/constantes';
import {i18nConstantes} from '../../../environments/i18n-constantes';
import '@angular/common/locales/global/fr';
import {Helpers} from '../class/helpers';
import {Roles} from '../../../environments/roles';
import {ServiceUtils} from '../service/service-utils.service';


/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

export abstract class ComponentCommon {
  readonly constantes = constantes;
  readonly i18nConstantes = i18nConstantes;
  readonly dateHelpers = DateHelpers;
  readonly helpers = Helpers;
  readonly rolesConstantes = Roles;
  yesLabel: string;
  noLabel: string;

  protected constructor(public serviceUtils: ServiceUtils,
                        public i18nBase?: string) {
    this.initComponentCommon();
  }

  initComponentCommon(): void {
    this.getLabels();
  }


  getLabels(): void {
    this.serviceUtils.translate.get(this.i18nConstantes.yes).toPromise().then(value => this.yesLabel = value);
    this.serviceUtils.translate.get(this.i18nConstantes.no).toPromise().then(value => this.noLabel = value);
  }

  deleteConfirmeMessage(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.deleteConfirmDialogMessage).toPromise();
  }

  deleteAllConfirmeMessage(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.deleteAllConfirmDialogMessage).toPromise();
  }

  deleteConfirmeMessageHeader(): Promise<string> {
    return this.serviceUtils.translate.get(this.i18nConstantes.deleteConfirmDialogHeader).toPromise();
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
    return this.helpers.hasRole(this.serviceUtils.authenficationProvider.getEnvService().roles.value, role);
  }

  hasEveryRoles(roles: string[]): boolean{
    return roles && roles.every(role => this.hasRole(role));
  }

  haseSomeRoles(roles: string[]): boolean{
    return roles && roles.some(role => this.hasRole(role));
  }

  async shoWConfirmDialog(message: Promise<string> | string, header: Promise<string> | string, commande: () => any): Promise<void> {
    this.serviceUtils.confirmationService.confirm({
      message: (message instanceof Promise) ? await message : message,
      header:  (header instanceof Promise) ? await header : header,
      acceptLabel: this.yesLabel,
      rejectLabel: this.noLabel,
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => commande(),
      reject: () => {
      },
      key: this.constantes.deleteConfirmDialogKey,
    });
  }
}
