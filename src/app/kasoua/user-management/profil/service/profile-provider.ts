/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */
import {AbstractServiceProvider} from '../../../../common/abstract/abstract-service-provider';
import {InterfaceProfile} from '../domain/interface-profile';
import {ProfileDomaine} from '../domain/profile-domaine';
import {UserConfigurationService} from '../../../../common/service/user-configuration.service';
import {ConfigurationService} from '../../../../common/service/configuration-service';
import {ProfilNodeService} from './profil-node.service';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class ProfileProvider extends AbstractServiceProvider<ProfileDomaine, InterfaceProfile>{
  constructor(userConfigurationService: UserConfigurationService,
              configurationService: ConfigurationService,
              profilNodeService: ProfilNodeService,
              public translate: TranslateService) {
    super(userConfigurationService, configurationService, translate , profilNodeService, null, null);
  }
}
