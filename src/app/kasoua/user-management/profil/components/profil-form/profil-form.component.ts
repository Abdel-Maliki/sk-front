import {Component, OnInit} from '@angular/core';
import {ProfileDomaine} from '../../domain/profile-domaine';
import {InterfaceProfile} from '../../domain/interface-profile';
import {ProfileProvider} from '../../service/profile-provider';
import {AbstractFormComponent} from '../../../../../common/abstract/abstract-form-component';
import {FormBuilder, Validators} from '@angular/forms';
import {i18nConstantes} from '../../../../../../constantes/i18n-constantes';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';

@Component({
  selector: 'app-profil-form',
  templateUrl: './profil-form.component.html',
  styleUrls: ['./profil-form.component.scss']
})
export class ProfilFormComponent extends AbstractFormComponent<ProfileDomaine, InterfaceProfile, ProfileProvider> implements OnInit {
  readonly name = 'name';
  readonly description = 'description';

  constructor(profileProvider: ProfileProvider,
              serviceUtils: ServiceUtils,
              private formBuilder: FormBuilder) {
    super(profileProvider, serviceUtils, i18nConstantes.profileBase);
  }

  ngOnInit(): void {
    if (!this.entity) {
      this.entity = new ProfileDomaine();
    }
    this.setFormData();
    this.subscribeForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.entity.name, [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      description: [this.entity.description, [Validators.maxLength(this.maxLength)]],
    });
  }

  setFormData(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get(this.name).setValue(this.entity.name);
    this.form.get(this.description).setValue(this.entity.description);
  }

  subscribeForm(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get(this.name).valueChanges.subscribe(value => this.entity.name = value);
    this.form.get(this.description).valueChanges.subscribe(value => this.entity.description = value);
  }

  getNewInstance(): ProfileDomaine {
    return new ProfileDomaine();
  }

}
