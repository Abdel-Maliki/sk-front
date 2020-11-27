import {AbstractServiceProvider} from '../../../../common/abstract/abstract-service-provider';
import {UserConfigurationService} from '../../../../common/service/user-configuration.service';
import {ConfigurationService} from '../../../../common/service/configuration-service';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserDomain} from '../domain/user-domain';
import {InterfaceUser} from './interface-user';
import {UserNodeService} from './user-node.service';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

@Injectable({providedIn: 'root'})
export class UserProvider extends AbstractServiceProvider<UserDomain, InterfaceUser> {
  constructor(userConfigurationService: UserConfigurationService,
              configurationService: ConfigurationService,
              userNodeService: UserNodeService,
              translate: TranslateService) {
    super(userConfigurationService, configurationService, translate, userNodeService);
  }
}
