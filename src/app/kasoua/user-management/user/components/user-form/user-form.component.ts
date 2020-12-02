import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserDomain, UserState} from '../../domain/user-domain';
import {InterfaceUser} from '../../service/interface-user';
import {UserProvider} from '../../service/user-provider';
import {AbstractFormComponent} from '../../../../../common/abstract/abstract-form-component';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ProfileProvider} from '../../../profil/service/profile-provider';
import {ProfileDomaine} from '../../../profil/domain/profile-domaine';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends AbstractFormComponent<UserDomain, InterfaceUser, UserProvider>
  implements OnInit, OnDestroy {

  profiles: ProfileDomaine[] = [];
  @Input() showButtons: boolean;

  readonly name = 'name';
  readonly userName = 'userName';
  readonly password = 'password';
  readonly repeatPassword = 'repeatPassword';
  readonly email = 'email';
  readonly profile = 'profile';
  readonly status = 'status';
  readonly passwordMinLength = 8;
  activeFormControl: FormControl;

  constructor(provider: UserProvider,
              serviceUtils: ServiceUtils,
              protected formBuilder: FormBuilder,
              protected profileProvider: ProfileProvider) {
    super(provider, serviceUtils, i18nConstantes.userBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscribeForm();
    this.setFormData();
    this.updateForm();
  }

  updateForm(): void {
    if (!this.forUpdate()) {
      return;
    }
    this.profiles.push(this.entity.profile);
    this.form.get(this.profile).setValue(this.entity.profile);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.entity.name, this.reqMinMaxValidator()],
      userName: [this.entity.userName, [...this.reqMinMaxValidator()]],
      email: [this.entity.email, [...this.reqMinMaxValidator(), Validators.email]],
      profile: [this.entity.profile, []],
      status: [this.entity.status === UserState.ACTIVE, []],
    });
  }

  setFormData(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get(this.name).setValue(this.entity.name);
    this.form.get(this.userName).setValue(this.entity.userName);
    this.form.get(this.email).setValue(this.entity.email);
    this.form.get(this.status).setValue(this.entity.status === UserState.ACTIVE);
    // this.form.get(this.profile).setValue(this.entity.profile);
  }

  subscribeForm(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.activeFormControl = new FormControl(this.entity.status === UserState.ACTIVE);

    this.form.get(this.userName).valueChanges.subscribe(value => this.entity.userName = value);
    this.form.get(this.name).valueChanges.subscribe(value => this.entity.name = value);
    this.form.get(this.email).valueChanges.subscribe(value => this.entity.email = value);
    this.form.get(this.status).valueChanges.subscribe(value => this.entity.status = value ? UserState.ACTIVE : UserState.DESACTIVE);
    // this.form.get(this.profile).valueChanges.subscribe(value => this.entity.profile = value);
  }

  getNewInstance(): UserDomain {
    return new UserDomain();
  }

  onKeyUp(search: string = ''): void {
    this.profileProvider.getEnvService().getAll().then(value => {
      this.profiles = value.data;
    });
  }

  isValidForm(): boolean {
    return this.form && this.form.valid && this.entity && !!this.entity.profile && !!this.entity.profile.id;
  }

  showActiveOption(): boolean {
    switch (this.entity.status) {
      case UserState.ACTIVE:
        return this.helpers.hasRole(Object.values(this.rolesConstantes), this.rolesConstantes.DISABLED_ACCOUNT);
      case UserState.BLOQUE:
        return this.helpers.hasRole(Object.values(this.rolesConstantes), this.rolesConstantes.ACTIVATE_ACCOUNT);
      case UserState.DESACTIVE:
        return this.helpers.hasRole(Object.values(this.rolesConstantes), this.rolesConstantes.ACTIVATE_ACCOUNT);
      default:
        this.helpers.fail(this.entity.status);
    }
  }
}
