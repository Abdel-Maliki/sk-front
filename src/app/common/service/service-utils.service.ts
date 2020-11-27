import {Injectable} from '@angular/core';
import {NotificationService} from './notification-service';
import {AppConfigService} from './appconfigservice';
import {ConfigurationService} from './configuration-service';
import {UserConfigurationService} from './user-configuration.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenficationProvider} from '../../front/classe/authenfication-provider';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {PasswordStateService} from './password-state-service';

/**
 * @author abdel-maliki
 * Date : 12/11/2020
 */

@Injectable({providedIn: 'root'})
export class ServiceUtils {
  constructor(public authenficationProvider: AuthenficationProvider,
              public notificationService: NotificationService,
              public userConfigurationService: UserConfigurationService,
              public passwordStateService: PasswordStateService,
              public confirmationService: ConfirmationService,
              public translate: TranslateService,
              public router: Router
  ) {
  }
}
