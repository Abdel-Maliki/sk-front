import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserDomaine} from '../../domain/user-domaine';
import {InterfaceUser} from '../../domain/interface-user';
import {UserProvider} from '../../service/user-provider';
import {AbstractFormComponent} from '../../../../../common/abstract/abstract-form-component';
import {NotificationService} from '../../../../../common/service/notification-service';
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../../../../environments/i18n-constantes';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../../common/function/confirmed.validator';
import {ProfileProvider} from '../../../profil/service/profile-provider';
import {ProfileDomaine} from '../../../profil/domain/profile-domaine';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends AbstractFormComponent<UserDomaine, InterfaceUser, UserProvider>
  implements OnInit, OnDestroy {

  profiles: ProfileDomaine[] = [];
  @Input() showButtons: boolean;

  readonly name = 'name';
  readonly userName = 'userName';
  readonly password = 'password';
  readonly repeatPassword = 'repeatPassword';
  readonly email = 'email';
  readonly profile = 'profile';
  readonly confirmedValidator = 'confirmedValidator';
  readonly passwordMinLength = 8;

  constructor(provider: UserProvider,
              notification: NotificationService,
              confirmationService: ConfirmationService,
              router: Router,
              translate: TranslateService,
              protected formBuilder: FormBuilder,
              protected profileProvider: ProfileProvider) {
    super(provider, notification, translate, router, i18nConstantes.userBase);
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
    this.form.removeControl(this.password);
    this.form.removeControl(this.repeatPassword);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.entity.name, this.reqMinMaxValidator()],
      userName: [this.entity.userName, [...this.reqMinMaxValidator()]],
      password: [this.entity.password, [Validators.required, Validators.maxLength(this.maxLength),
        Validators.minLength(this.passwordMinLength)]],
      repeatPassword: [null, [Validators.required, Validators.maxLength(this.maxLength), Validators.minLength(this.passwordMinLength)]],
      email: [this.entity.email, [...this.reqMinMaxValidator(), Validators.email]],
      profile: [this.entity.profile, []],
    }, this.forUpdate() ? {} : {
      validator: ConfirmedValidator('password', 'repeatPassword')
    });
  }

  setFormData(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get(this.name).setValue(this.entity.name);
    this.form.get(this.userName).setValue(this.entity.userName);
    this.form.get(this.password).setValue(this.entity.password);
    this.form.get(this.email).setValue(this.entity.email);
    // this.form.get(this.profile).setValue(this.entity.profile);
  }

  subscribeForm(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get(this.userName).valueChanges.subscribe(value => this.entity.userName = value);
    this.form.get(this.name).valueChanges.subscribe(value => this.entity.name = value);
    this.form.get(this.password).valueChanges.subscribe(value => this.entity.password = value);
    this.form.get(this.email).valueChanges.subscribe(value => this.entity.email = value);
    // this.form.get(this.profile).valueChanges.subscribe(value => this.entity.profile = value);
  }

  getNewInstance(): UserDomaine {
    return new UserDomaine();
  }

  onKeyUp(search: string = ''): void {
    this.profileProvider.getEnvService().search({global: search}).then(value => {
      this.profiles = value.data;
    });
  }

  isValidForm(): boolean {
    return this.form && this.form.valid && this.entity && !!this.entity.profile && !!this.entity.profile.id;
  }
}
