import {AbstractEntity} from './abstract-entity';
import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {ResponseWrapper} from '../class/response-wrapper';
import {FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../service/notification-service';
import {TranslateService} from '@ngx-translate/core';
import {AbstractComponent} from './abstract-component';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

@Directive()
// tslint:disable-next-line:max-line-length directive-class-suffix
export abstract class AbstractFormComponent<T extends AbstractEntity<T>, I extends InterfaceService<T>, P extends AbstractServiceProvider<T, I>>
  extends AbstractComponent<T, I, P> implements OnInit, OnDestroy {

  form: FormGroup;
  @Input() entity: T;
  @Output() saveEvent: EventEmitter<T> = new EventEmitter();
  @Output() updateEvent: EventEmitter<T> = new EventEmitter();
  minLength = 2;
  maxLength = 250;
  disabled = false;
  readonly requiredControl = 'required';
  readonly maxLengthControl: string = 'maxlength';
  readonly minLengtControl: string = 'minlength';

  protected constructor(public provider: P,
                        public notification: NotificationService,
                        public translate: TranslateService) {
    super(provider, notification, translate);
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  save(entity?: T): Promise<ResponseWrapper<T>> {
    return new Promise<ResponseWrapper<T>>(async (resolve) => {
      try {
        const wrapper: ResponseWrapper<T> = await this.provider.getEnvService().create(entity ? entity : this.entity);
        if (wrapper.isValid()) {
          this.saveEvent.emit(wrapper.data);
        }
        resolve(wrapper);
      } catch (error) {
        resolve(ResponseWrapper.ko(error));
      }
    });
  }

  update(id?: number | string, entity?: T): Promise<ResponseWrapper<T>> {
    this.entity = entity ? entity : this.entity;
    return new Promise<ResponseWrapper<T>>(async (resolve) => {
      try {
        const wrapper: ResponseWrapper<T> = await this.provider.getEnvService().update(this.entity, id ? id : this.entity.id);
        if (wrapper.isValid()) {
          this.updateEvent.emit(wrapper.data);
        }
        resolve(wrapper);
      } catch (error) {
        resolve(ResponseWrapper.ko(error));
      }
    });
  }

  reqMinMaxValidator(): any[] {
    return [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)];
  }

  minMaxValidator(): any[] {
    return [Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)];
  }

  reqMinValidator(): any[] {
    return [Validators.required, Validators.minLength(this.minLength)];
  }

  reqMaxValidator(): any[] {
    return [Validators.required, Validators.maxLength(this.maxLength)];
  }

  haseError(item: string, error?: string): boolean {
    return this.form && this.form.controls && this.form.controls[item]
      && this.form.controls[item].invalid && this.form.controls[item].dirty
      && this.form.controls[item].errors
      && (error ? this.form.controls[item].errors[error] : true);
  }

  isValidForm(): boolean {
    return this.form && this.form.valid;
  }

  isNotValidForm(): boolean {
    return !this.isValidForm();
  }

  fotUpdate(): boolean {
    return !!this.entity && !!this.entity.id;
  }

}
