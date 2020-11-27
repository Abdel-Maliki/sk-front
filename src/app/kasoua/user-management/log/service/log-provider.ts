import {Injectable} from '@angular/core';
import {AbstractServiceProvider} from '../../../../common/abstract/abstract-service-provider';
import {UserConfigurationService} from '../../../../common/service/user-configuration.service';
import {ConfigurationService} from '../../../../common/service/configuration-service';
import {TranslateService} from '@ngx-translate/core';
import {LogDomain} from '../domain/log-domain';
import {InterfaceLog} from './interface-log';
import {LogNodeService} from './log-node-service';

/**
 * @author abdel-maliki
 * Date : 27/11/2020
 */

@Injectable({providedIn: 'root'})
export class LogProvider extends AbstractServiceProvider<LogDomain, InterfaceLog> {
  constructor(userConfigurationService: UserConfigurationService,
              configurationService: ConfigurationService,
              logNodeService: LogNodeService,
              translate: TranslateService) {
    super(userConfigurationService, configurationService, translate, logNodeService);
  }
}
