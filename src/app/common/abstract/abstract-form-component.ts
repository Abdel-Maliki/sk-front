import {AbstractEntity} from './abstract-entity';
import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {ResponseWrapper} from '../class/response-wrapper';
import {FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../service/notification-service';
import {TranslateService} from '@ngx-translate/core';
import {AbstractComponent} from './abstract-component';
import {Pagination} from '../class/pagination';
import {Router} from '@angular/router';

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
  @Input() showButtons: boolean;
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
                        public translate: TranslateService,
                        router: Router,
                        public i18nBase: string) {
    super(provider, notification, translate, router, i18nBase);
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    if (!this.entity && this.provider.getEnvService().entity$.value && this.provider.getEnvService().entity$.value.id) {
      this.entity = this.provider.getEnvService().entity$.value;
    } else if (!this.entity) {
      this.entity = this.getNewInstance();
    }
  }

  onSubmit(entity: T = this.entity): void {
    console.log('Class: AbstractFormComponent, Function: onSubmit, Line 55 , : '
    , );
    if (this.form && this.form.valid) {
      this.create(entity).then();
    } else if (this.form && this.form.valid) {
      this.update().then();
    }
  }

  create(entity: T = this.entity): Promise<ResponseWrapper<T>> {
    return new Promise<ResponseWrapper<T>>(async (resolve, reject) => {
      this.provider.getEnvService().create(entity)
        .then((responseWrapper: ResponseWrapper<T>) => {
          this.saveEvent.emit(responseWrapper.data);
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
    });
  }

  update(id: number | string = this.entity.id, entity: T = this.entity): Promise<ResponseWrapper<T>> {
    this.entity = entity ? Object.assign({}, entity) : this.entity;
    return new Promise<ResponseWrapper<T>>(async (resolve, reject) => {
      this.provider.getEnvService().update(entity, id)
        .then((responseWrapper: ResponseWrapper<T>) => {
          this.saveEvent.emit(responseWrapper.data);
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
    });
  }

  createAndGet(pagination: Pagination, entity: T = this.entity): Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>(async (resolve, reject) => {
      this.provider.getEnvService().createAndGet({entity, pagination})
        .then((responseWrapper: ResponseWrapper<T[]>) => {
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
    });
  }

  updateAndGet(pagination: Pagination, entity: T = this.entity, id: number | string = this.entity.id): Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>(async (resolve, reject) => {
      this.provider.getEnvService().updateAndGet({entity, pagination}, id)
        .then((responseWrapper: ResponseWrapper<T[]>) => {
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
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

  forUpdate(): boolean {
    return !!this.entity && !!this.entity.id;
  }

}
