import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {ProfilFormComponent} from '../profil-form/profil-form.component';
import {MenuItem} from 'primeng/api';
import {i18nConstantes} from '../../../../../../constantes/i18n-constantes';
import {MenuItemImp} from '../../../../../common/class/menu-item-imp';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
export class ProfilListComponent extends AbstractListComponent<ProfileDomaine, InterfaceProfile, ProfileProvider, ProfilFormComponent>
  implements OnInit, OnDestroy {

  profileRoles: string[] = [];
  items: MenuItem[];
  val = 'pi pi-fw pi-circle-off';
  showProfileRole = false;
  roleItem: MenuItem = new MenuItemImp(this.promiseI18nElement('manageRoles'), 'fa fa-unlock-alt fa-lg', () => this.enableRoleOption());
  visibleConfirmPassword = false;
  searchControl: FormControl = new FormControl(null);
  searchSubscription: Subscription;


  constructor(profileProvider: ProfileProvider,
              serviceUtils: ServiceUtils) {
    super(profileProvider, serviceUtils, i18nConstantes.profileBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.modalItems.push(this.roleItem);
  }

  subscribe(): void {
    super.subscribe();
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.pagination.filters.value = value;
        this.reload().then();
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  async enableRoleOption(): Promise<void> {
    this.profileRoles = await this.provider.getEnvService().getRoles(this.entity.id);
    this.showProfileRole = true;
  }

  async setRoles(): Promise<void> {
    await this.provider.getEnvService().setRoles(this.entity.id, this.profileRoles, this.serviceUtils.userConfigurationService.password);
    this.disabledRoleOption();
    this.disablePasswordConfirmation();
    await this.serviceUtils.notificationService.showSuccess();
  }

  disabledRoleOption(): void {
    this.showProfileRole = false;
  }

  getNewInstance(): ProfileDomaine {
    return new ProfileDomaine();
  }

  showContextMenuOption(): boolean {
    return this.haseSomeRoles(
      [this.rolesConstantes.AFFECT_PROFILE_ROLE, this.rolesConstantes.EDIT_PROFILE, this.rolesConstantes.DELETE_PROFILE]
    );
  }

  async rebuildMenuItem(entity: ProfileDomaine): Promise<void> {
    this.modalItems = [];
    if (this.hasRole(this.rolesConstantes.EDIT_PROFILE)) {
      this.modalItems.push(this.modalUpdateItem);
    }
    if (this.hasRole(this.rolesConstantes.DELETE_PROFILE)) {
      this.modalItems.push(this.DELETE_ITEM);
    }
    if (this.hasRole(this.rolesConstantes.AFFECT_PROFILE_ROLE)) {
      this.modalItems.push(this.roleItem);
    }
  }

  disablePasswordConfirmation(): void {
    this.visibleConfirmPassword = false;
  }

  setRoleOrEnablePasswordConfirmation(): void {
    this.isValidPassword ? this.setRoles() : this.enablePasswordConfirmation();
  }
}
