import {Injectable} from '@angular/core';
import {ResponseWrapper} from '../class/response-wrapper';
import {MessageService} from 'primeng/api';
import {constantes} from '../../../constantes/constantes';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../constantes/i18n-constantes';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

@Injectable({providedIn: 'root'})
export class NotificationService {
  public readonly successSeverity = 'success';
  public readonly infoSeverity = 'info';
  public readonly warnSeverity = 'warn';
  public readonly errorSeverity = 'error';
  public readonly successSummary = 'Succès';
  public readonly infoSummary = 'Information';
  public readonly warnSummary = 'Avertissement';
  public readonly errorSummary = 'Erreur';

  constructor(public messageService: MessageService, public translate: TranslateService) {
  }

  async showError(message?: string,
                  summary = this.errorSummary,
                  key = constantes.defaultNotificationKey,
                  id?: any,
                  life?: number,
                  sticky?: boolean,
                  closable?: boolean,
                  data?: any): Promise<void> {
    message = message ? message : await this.translate.get(i18nConstantes.errorMessage).toPromise();
    this.messageService.add({detail: message, severity: this.errorSeverity, summary, key, id, life, sticky, closable, data});
  }

  async showSuccess(message?: string,
                    summary = this.successSummary,
                    key = constantes.defaultNotificationKey,
                    id?: any,
                    life?: number,
                    sticky?: boolean,
                    closable?: boolean,
                    data?: any): Promise<void> {
    message = message ? message : await this.translate.get(i18nConstantes.successMessage).toPromise();
    this.messageService.add({detail: message, severity: this.successSeverity, summary, key, id, life, sticky, closable, data});
  }

  showWarning(message: string,
              summary = this.warnSummary,
              key = constantes.defaultNotificationKey,
              id?: any,
              life?: number,
              sticky?: boolean,
              closable?: boolean,
              data?: any): void {
    this.messageService.add({detail: message, severity: this.warnSeverity, summary, key, id, life, sticky, closable, data});
  }

  showInfo(message: string,
           summary = this.infoSummary,
           key = constantes.defaultNotificationKey,
           id?: any,
           life?: number,
           sticky?: boolean,
           closable?: boolean,
           data?: any): void {
    this.messageService.add({detail: message, severity: this.infoSeverity, summary, key, id, life, sticky, closable, data});
  }

  wrapperMessage(wrapper: ResponseWrapper<any>, errorMessage?: string): void {
    wrapper ? wrapper.isValid() ? this.showSuccess() : this.showError(wrapper.error.message) : this.showError(errorMessage);
  }
}
