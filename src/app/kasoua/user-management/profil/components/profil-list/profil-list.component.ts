import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {NotificationService} from '../../../../../common/service/notification-service';
import {ProfilFormComponent} from '../profil-form/profil-form.component';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {Router} from '@angular/router';
import {MenuItemImp} from '../../../../../common/class/menu-item-imp';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
// tslint:disable-next-line:max-line-length
export class ProfilListComponent extends AbstractListComponent<ProfileDomaine, InterfaceProfile, ProfileProvider, ProfilFormComponent> implements OnInit, OnDestroy {

  roles: string[] = [];
  items: MenuItem[];
  val = 'pi pi-fw pi-circle-off';
  showProfileRole = false;
  roleItem: MenuItem = new MenuItemImp(this.promiseI18nElement('manageRoles'), 'fa fa-unlock-alt fa-lg', () => this.enableRoleOption());

  constructor(profileProvider: ProfileProvider,
              notification: NotificationService,
              confirmationService: ConfirmationService,
              router: Router,
              translate: TranslateService) {
    super(profileProvider, notification, confirmationService, translate, router, i18nConstantes.profileBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.modalItems.push(this.roleItem);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  async enableRoleOption(): Promise<void> {
    this.roles = await this.provider.getEnvService().getRoles(this.entity.id);
    this.showProfileRole = true;
  }

  async setRoles(): Promise<void> {
    await this.provider.getEnvService().setRoles(this.entity.id, this.roles);
    this.desabledRoleOption();
    await this.notification.showSuccess();
  }

  desabledRoleOption(): void {
    this.showProfileRole = false;
  }

  getNewInstance(): ProfileDomaine {
    return new ProfileDomaine();
  }

  showContextMenu(entity: ProfileDomaine): boolean {
    return entity && entity.name !== this.constantes.profileAdmin;
  }
}
