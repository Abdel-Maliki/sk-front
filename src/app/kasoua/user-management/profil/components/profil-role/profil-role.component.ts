import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AbstractComponent} from '../../../../../common/abstract/abstract-component';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {Roles} from '../../../../../../environments/roles';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';

@Component({
  selector: 'app-profil-role',
  templateUrl: './profil-role.component.html',
  styleUrls: ['./profil-role.component.scss']
})
export class ProfilRoleComponent extends AbstractComponent<ProfileDomaine, InterfaceProfile, ProfileProvider> implements OnInit, OnDestroy {

  items: MenuItem[];
  @Input() profileRoles: string[] = [];
  readonly selectedIcon = 'fa fa-fw fa-check-square fa-lg';
  readonly unselectedIcon = 'fa fa-fw fa-square-o fa-lg';

  constructor(profileProvider: ProfileProvider,
              serviceUtils: ServiceUtils) {
    super(profileProvider, serviceUtils, i18nConstantes.profileBase);
  }

  ngOnInit(): void {
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
              this.buildItem(Roles.LISTER_USER),
              this.buildItem(Roles.DELETE_USER),
              this.buildItem(Roles.ACTIVATE_ACCOUNT),
              this.buildItem(Roles.DISABLED_ACCOUNT),
              this.buildItem(Roles.RESET_PASSWORD),
            ]
          },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
              this.buildItem(Roles.ADD_PROFILE),
              this.buildItem(Roles.EDIT_PROFILE),
              this.buildItem(Roles.LISTER_PROFILE),
              this.buildItem(Roles.DELETE_PROFILE),
              this.buildItem(Roles.AFFECT_PROFILE_ROLE),
            ]
          },
        ]
      },
    ];
  }

  ngOnDestroy(): void {
  }

  getIcon(role: string): string {
    return (this.helpers.hasRole(this.profileRoles, role) ? this.selectedIcon : this.unselectedIcon) + ` ${role}`;
  }

  setIcon(role: string): void {
    const index: number = this.profileRoles.indexOf(role);
    const hasRole: boolean = index >= 0;
    hasRole ? this.profileRoles.splice(index, 1) : this.profileRoles.push(role);
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
