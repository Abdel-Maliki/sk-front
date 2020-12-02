import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDomain} from '../../../kasoua/user-management/user/domain/user-domain';
import {InterfaceUser} from '../../../kasoua/user-management/user/service/interface-user';
import {UserProvider} from '../../../kasoua/user-management/user/service/user-provider';
import {ServiceUtils} from '../../../common/service/service-utils.service';
import {FormBuilder, Validators} from '@angular/forms';
import {i18nConstantes} from '../../../../constantes/i18n-constantes';
import {AbstractFormComponent} from '../../../common/abstract/abstract-form-component';
import {ConfirmedValidator} from '../../../common/function/confirmed.validator';
import {ResponseWrapper} from '../../../common/class/response-wrapper';
import {constantes} from '../../../../constantes/constantes';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends AbstractFormComponent<UserDomain, InterfaceUser, UserProvider>
  implements OnInit, OnDestroy {

  readonly oldPassword = 'oldPassword';
  readonly newPassword = 'newPassword';
  readonly repeatPassword = 'repeatPassword';
  readonly confirmedValidator = 'confirmedValidator';
  readonly passwordMinLength = 4;

  constructor(provider: UserProvider, serviceUtils: ServiceUtils, protected formBuilder: FormBuilder) {
    super(provider, serviceUtils, i18nConstantes.userBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getNewInstance(): UserDomain {
    return undefined;
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.maxLength(this.maxLength), Validators.minLength(this.passwordMinLength)]],
      newPassword: ['', [Validators.required, Validators.maxLength(this.maxLength), Validators.minLength(this.passwordMinLength)]],
      repeatPassword: ['', [Validators.required, Validators.maxLength(this.maxLength), Validators.minLength(this.passwordMinLength)]],
    }, {
      validator: ConfirmedValidator(this.newPassword, this.repeatPassword)
    });
  }

  validate(): void {
    if (this.form.invalid) {
      return;
    }
    this.provider.getEnvService().updateMyPassword(this.form.get(this.oldPassword).value, this.form.get(this.newPassword).value)
      .then(response => {
        localStorage.setItem(constantes.storageToken, JSON.stringify(response.data.token));
        this.serviceUtils.userConfigurationService.password = this.form.get(this.newPassword).value;
        this.serviceUtils.authProvider.getEnvService().tokenSubject.next(response.data.token);
        this.serviceUtils.notificationService.showSuccess().then();
        this.saveEvent.emit(null);
      })
      .catch((reason: ResponseWrapper<any>) => {
        this.serviceUtils.notificationService.showError(reason.error ? reason.error.message : this.errorMessage).then();
      });
  }

}
