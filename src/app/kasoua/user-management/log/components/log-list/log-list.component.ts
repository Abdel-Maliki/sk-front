import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {LogDomain, LogState} from '../../domain/log-domain';
import {InterfaceLog} from '../../service/interface-log';
import {LogProvider} from '../../service/log-provider';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent extends AbstractListComponent<LogDomain, InterfaceLog, LogProvider, null>
  implements OnInit, OnDestroy {

  LOG_STATE = LogState;
  SUCCESS_LABEL: string;
  ERROR_LABEL: string;


  constructor(provider: LogProvider,
              serviceUtils: ServiceUtils) {
    super(provider, serviceUtils, i18nConstantes.logBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getNewInstance(): LogDomain {
    return new LogDomain();
  }

  checkRoles(): void {
    this.haseDeleteRole = this.hasRole(this.rolesConstantes.DELETE_LOG);
    super.checkRoles();
  }

  getLabels(): void {
    this.promiseI18nElement('successLabel').then(value => this.SUCCESS_LABEL = value);
    this.promiseI18nElement('errorLabel').then(value => this.ERROR_LABEL = value);
    super.getLabels();
  }

}
