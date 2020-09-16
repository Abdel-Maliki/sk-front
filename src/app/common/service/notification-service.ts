import {Injectable} from '@angular/core';
import {ResponseWrapper} from '../class/response-wrapper';
import {MessageService} from 'primeng/api';
import {constantes} from '../../../environments/constantes';

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

  constructor(public messageService: MessageService) {
  }

  showError(message = constantes.errorMessage, summary = this.errorSummary, key = constantes.defaultNotificationKey,
            id?: any, life?: number, sticky?: boolean, closable?: boolean, data?: any): void {
    this.messageService.add({detail: message, severity: this.errorSeverity, summary, key, id, life, sticky, closable, data});
  }

  showSuccess(message = constantes.successMessage, summary = this.successSummary, key = constantes.defaultNotificationKey,
              id?: any, life?: number, sticky?: boolean, closable?: boolean, data?: any): void {
    this.messageService.add({detail: message, severity: this.successSeverity, summary, key, id, life, sticky, closable, data});
  }

  showWarning(message, summary = this.warnSummary, key = constantes.defaultNotificationKey, id?: any, life?: number, sticky?: boolean,
              closable?: boolean, data?: any): void {
    this.messageService.add({detail: message, severity: this.warnSeverity, summary, key, id, life, sticky, closable, data});
  }

  wrapperMessage(wrapper: ResponseWrapper<any>, errorMessage = constantes.errorMessage): void {
    wrapper ? wrapper.isValid() ? this.showSuccess() : this.showError(wrapper.error) : this.showError(errorMessage);
  }
}
