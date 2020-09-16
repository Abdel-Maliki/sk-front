import {Component, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {NotificationService} from '../../../../../common/service/notification-service';
import {ProfilFormComponent} from '../profil-form/profil-form.component';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
// tslint:disable-next-line:max-line-length
export class ProfilListComponent extends AbstractListComponent
  <ProfileDomaine, InterfaceProfile, ProfileProvider, ProfilFormComponent> implements OnInit {

  constructor(profileProvider: ProfileProvider,
              notification: NotificationService,
              confirmationService: ConfirmationService,
              translate: TranslateService) {
    super(profileProvider, notification, confirmationService, translate);
  }

  ngOnInit(): void {
  }

  sort($event: any): void {

  }

  newInstance(): ProfileDomaine {
    return new ProfileDomaine();
  }
}
