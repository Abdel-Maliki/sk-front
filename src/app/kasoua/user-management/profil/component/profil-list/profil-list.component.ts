import {Component, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {NotificationService} from '../../../../../common/service/notification-service';
import {ProfilFormComponent} from '../profil-form/profil-form.component';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
// tslint:disable-next-line:max-line-length
export class ProfilListComponent extends AbstractListComponent<ProfileDomaine, InterfaceProfile, ProfileProvider, ProfilFormComponent> implements OnInit {

  constructor(profileProvider: ProfileProvider,
              notification: NotificationService,
              confirmationService: ConfirmationService,
              translate: TranslateService) {
    super(profileProvider, notification, confirmationService, translate, i18nConstantes.profileBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  newInstance(): ProfileDomaine {
    return this.createInstance(ProfileDomaine);
  }
}
