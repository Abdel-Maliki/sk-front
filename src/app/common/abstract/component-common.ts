import {DateHelpers} from '../class/date-helpers';
import {constantes} from '../../../environments/constantes';
import {i18nConstantes} from '../../../environments/i18n-constantes';
import '@angular/common/locales/global/fr';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../service/notification-service';
import {Helpers} from '../class/helpers';


/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

export abstract class ComponentCommon {
  readonly constantes = constantes;
  readonly i18nConstantes = i18nConstantes;
  readonly dateHelpers = DateHelpers;
  readonly helpers = Helpers;

  protected constructor(public translate: TranslateService,
                        public notification: NotificationService,
                        public i18nBase?: string) {
  }

  deleteConfirmeMessage(): Promise<string> {
    return this.translate.get(this.i18nConstantes.deleteConfirmDialogMessage).toPromise();
  }

  deleteAllConfirmeMessage(): Promise<string> {
    return this.translate.get(this.i18nConstantes.deleteAllConfirmDialogMessage).toPromise();
  }

  deleteConfirmeMessageHeader(): Promise<string> {
    return this.translate.get(this.i18nConstantes.deleteConfirmDialogHeader).toPromise();
  }

  yesLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.yes).toPromise();
  }

  noLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.no).toPromise();
  }

  i18nElement(value: string): string {
    return this.i18nBase + '.' + value;
  }

  promiseI18nElement(value: string): Promise<string> {
    return this.translate.get(this.i18nElement(value)).toPromise();
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
    return this.translate.get(this.i18nConstantes.delete).toPromise();
  }

  editLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.edit).toPromise();
  }

  updateLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.update).toPromise();
  }

  addLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.add).toPromise();
  }

  cancelLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.cancel).toPromise();
  }

  delay(ms: number): Promise<void> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
