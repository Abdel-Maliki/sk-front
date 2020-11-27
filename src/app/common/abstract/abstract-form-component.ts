import {AbstractEntity} from './abstract-entity';
import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {ResponseWrapper} from '../class/response-wrapper';
import {FormGroup, Validators} from '@angular/forms';
import {AbstractComponent} from './abstract-component';
import {Pagination} from '../class/pagination';
import {ServiceUtils} from '../service/service-utils.service';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */


@Directive()
export abstract class AbstractFormComponent<T extends AbstractEntity<T>,
  I extends InterfaceService<T>,
  P extends AbstractServiceProvider<T, I>> extends AbstractComponent<T, I, P> implements OnInit, OnDestroy {

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
                        public serviceUtils: ServiceUtils,
                        public i18nBase: string) {
    super(provider, serviceUtils, i18nBase);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.entity && this.provider.getEnvService().entity$.value && this.provider.getEnvService().entity$.value.id) {
      this.entity = this.provider.getEnvService().entity$.value;
    } else if (!this.entity) {
      this.entity = this.getNewInstance();
    }
  }

  onSubmit(entity: T = this.entity, ...others): Promise<ResponseWrapper<T>> {
    if (this.form && this.form.valid) {
      return this.create(entity, others).then();
    } else if (this.form && this.form.valid) {
      return this.update(entity.id, entity, others).then();
    }
  }

  create(entity: T = this.entity, ...others): Promise<ResponseWrapper<T>> {
    return new Promise<ResponseWrapper<T>>(async (resolve, reject) => {
      this.provider.getEnvService().create(entity, others)
        .then((responseWrapper: ResponseWrapper<T>) => {
          this.saveEvent.emit(responseWrapper.data);
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
    });
  }

  update(id: number | string = this.entity.id, entity: T = this.entity, ...others): Promise<ResponseWrapper<T>> {
    this.entity = entity ? Object.assign({}, entity) : this.entity;
    return new Promise<ResponseWrapper<T>>(async (resolve, reject) => {
      this.provider.getEnvService().update(entity, id, others)
        .then((responseWrapper: ResponseWrapper<T>) => {
          this.saveEvent.emit(responseWrapper.data);
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
    });
  }

  createAndGet(pagination: Pagination, entity: T = this.entity, ...others): Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>(async (resolve, reject) => {
      this.provider.getEnvService().createAndGet({entity, pagination}, others)
        .then((responseWrapper: ResponseWrapper<T[]>) => {
          resolve(responseWrapper);
        }).catch((error: ResponseWrapper<T>) => {
        reject(error);
      });
    });
  }

  updateAndGet(pagination: Pagination, entity: T = this.entity, id: number | string = this.entity.id, ...others)
    : Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>(async (resolve, reject) => {
      this.provider.getEnvService().updateAndGet({entity, pagination}, id, others)
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
