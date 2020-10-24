import {DateHelpers} from '../class/date-helpers';
import {constantes} from '../../../environments/constantes';
import {i18nConstantes} from '../../../environments/i18n-constantes';
import '@angular/common/locales/global/fr';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../service/notification-service';


/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

export abstract class ComponentCommon {
  readonly constantes = constantes;
  readonly i18nConstantes = i18nConstantes;
  readonly dateHelpers = DateHelpers;

  protected constructor(public translate: TranslateService,
                        public notification: NotificationService,
                        public i18nBase?: string) {
  }

  deleteConfirmeMessage(): Promise<string>{
    return this.translate.get(this.i18nConstantes.deleteConfirmDialogMessage).toPromise();
  }

  deleteAllConfirmeMessage(): Promise<string>{
    return this.translate.get(this.i18nConstantes.deleteAllConfirmDialogMessage).toPromise();
  }

  deleteConfirmeMessageHeader(): Promise<string>{
    return this.translate.get(this.i18nConstantes.deleteConfirmDialogHeader).toPromise();
  }

  yesLabel(): Promise<string>{
    return this.translate.get(this.i18nConstantes.yes).toPromise();
  }

  noLabel(): Promise<string>{
    return this.translate.get(this.i18nConstantes.no).toPromise();
  }

  i18nElement(value: string): string{
    return this.i18nBase + '.' + value;
  }

  i18nError(value: string): string{
    return this.i18nBase + '.errors.' + value;
  }

  fieldLabel(value: string): string{
    return this.i18nBase + '.fields.' + value;
  }

  deleteLabel(): Promise<string>{
    return this.translate.get(this.i18nConstantes.delete).toPromise();
  }

  editLabel(): Promise<string>{
    return this.translate.get(this.i18nConstantes.edit).toPromise();
  }

  updateLabel(): Promise<string>{
    return this.translate.get(this.i18nConstantes.update).toPromise();
  }

  addLabel(): Promise<string>{
    return this.translate.get(this.i18nConstantes.add).toPromise();
  }

  cancelLabel(): Promise<string> {
    return this.translate.get(this.i18nConstantes.cancel).toPromise();
  }
}
