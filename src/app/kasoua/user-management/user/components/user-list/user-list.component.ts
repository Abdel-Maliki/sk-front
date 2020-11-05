import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {NotificationService} from '../../../../../common/service/notification-service';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {UserDomaine} from '../../domain/user-domaine';
import {InterfaceUser} from '../../domain/interface-user';
import {UserProvider} from '../../service/user-provider';
import {UserFormComponent} from '../user-form/user-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractListComponent<UserDomaine, InterfaceUser, UserProvider, UserFormComponent>
  implements OnInit, OnDestroy {

  formLink = 'user-management/users/form';

  constructor(provider: UserProvider,
              notification: NotificationService,
              confirmationService: ConfirmationService,
              public router: Router,
              translate: TranslateService) {
    super(provider, notification, confirmationService, translate, router, i18nConstantes.userBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getNewInstance(): UserDomaine {
    return new UserDomaine();
  }
}
