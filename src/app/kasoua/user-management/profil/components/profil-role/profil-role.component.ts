import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {AbstractComponent} from '../../../../../common/abstract/abstract-component';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {NotificationService} from '../../../../../common/service/notification-service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {Roles} from '../../../../../../environments/roles';

@Component({
  selector: 'app-profil-role',
  templateUrl: './profil-role.component.html',
  styleUrls: ['./profil-role.component.scss']
})
export class ProfilRoleComponent extends AbstractComponent<ProfileDomaine, InterfaceProfile, ProfileProvider> implements OnInit, OnDestroy {

  items: MenuItem[];
  @Input() roles: string[] = [];
  readonly selectedIcon = 'fa fa-fw fa-check-square fa-lg';
  readonly unselectedIcon = 'fa fa-fw fa-square-o fa-lg';

  constructor(profileProvider: ProfileProvider,
              notification: NotificationService,
              confirmationService: ConfirmationService,
              router: Router,
              translate: TranslateService) {
    super(profileProvider, notification, translate, router, i18nConstantes.profileBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.items = [
      {
        label: 'Administration',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Utilisateurs',
            icon: 'pi pi-fw pi-user',
            items: [
              this.buildItem(Roles.ADD_USER),
              this.buildItem(Roles.EDIT_USER),
              this.buildItem(Roles.READ_USER),
              this.buildItem(Roles.DELETE_USER),
            ]
          },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
              this.buildItem(Roles.ADD_PROFILE),
              this.buildItem(Roles.EDIT_PROFILE),
              this.buildItem(Roles.READ_PROFILE),
              this.buildItem(Roles.DELETE_PROFILE),
              this.buildItem(Roles.AFFECT_PROFILE_ROLE),
            ]
          },
        ]
      },
    ];
  }

  ngOnDestroy(): void {
    console.log('Class: ProfilRoleComponent, Function: ngOnDestroy, Line 67 , this.roles: '
    , this.roles);
    super.ngOnDestroy();
  }

  getIcon(role: string): string {
    return (this.helpers.hasRole(this.roles, role) ? this.selectedIcon : this.unselectedIcon) + ` ${role}`;
  }

  setIcon(role: string): void {
    const index: number = this.roles.indexOf(role);
    const hasRole: boolean = index >= 0;
    hasRole ? this.roles.splice(index, 1) : this.roles.push(role);
    Array.from(document.getElementsByClassName(role)).forEach(span => {
      const newClass: string = span.getAttribute('class')
        .replace(hasRole ? this.selectedIcon : this.unselectedIcon, hasRole ? this.unselectedIcon : this.selectedIcon);
      span.setAttribute('class', newClass);
    });
  }

  buildItem(role: string): MenuItem {
    return {id: role, icon: this.getIcon(role), label: role, command: () => this.setIcon(role)};
  }

  getNewInstance(): ProfileDomaine {
    return undefined;
  }

}
