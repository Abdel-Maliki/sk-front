import {AbstractEntity} from './abstract-entity';
import {Directive, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {NotificationService} from '../service/notification-service';
import {AbstractFormComponent} from './abstract-form-component';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {MenuItemImp} from '../class/menu-item-imp';
import {ResponseWrapper} from '../class/response-wrapper';
import {DateHelpers} from '../class/DateHelpers';
import {constantes} from '../../../environments/constantes';
import {TranslateService} from '@ngx-translate/core';
import {AbstractComponent} from './abstract-component';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

@Directive()
export abstract class AbstractListComponent<
  T extends AbstractEntity<T>,
  I extends InterfaceService<T>,
  P extends AbstractServiceProvider<T, I>,
  F extends AbstractFormComponent<T, I, P>> extends AbstractComponent<T, I, P> implements OnInit, OnDestroy {

  selectedEntities: T[] = [];
  entity: T;
  showFormDialog = false;
  @ViewChild('formComponent') formComponent: F;
  deleteConfirmDialogPosition = 'topright';

  updateItem: MenuItem = new MenuItemImp('Modifier', 'pi pi-refresh', () => this.enableShowDialog(this.entity));
  deleteItem: MenuItem = new MenuItemImp('Supprimer', 'pi pi-trash', () => this.deleteConfimation());
  items: MenuItem[] = [this.updateItem, this.deleteItem];

  protected constructor(public provider: P,
                        public notification: NotificationService,
                        public confirmationService: ConfirmationService,
                        public translate: TranslateService) {
    super(provider, notification, translate);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.provider.getEnvService().pageSubscrption) {
      this.provider.getEnvService().pageSubscrption.unsubscribe();
    }
  }

  abstract newInstance(): T;

  enableShowDialog(entity?: T): void {
    this.entity = entity ? entity : this.newInstance();
    this.showFormDialog = true;
  }

  desabledShowDialog(): void {
    this.showFormDialog = false;
    if (this.formComponent) {
      this.formComponent.disabled = false;
    }
  }

  forUpdate(): boolean {
    return !!this.entity && !!this.entity.id;
  }

  saveOrUpdate(): void {
    this.forUpdate() ? this.update() : this.save();
  }

  save(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.save().then((value: ResponseWrapper<T>) => {
        this.notification.wrapperMessage(value);
        if (value.isNotValid()) {
          this.formComponent.disabled = false;
        }
      }, () => this.formComponent.disabled = false);
    }
  }

  update(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.update().then((value: ResponseWrapper<T>) => {
        this.notification.wrapperMessage(value);
        if (value.isNotValid()) {
          this.formComponent.disabled = false;
        }
      }, () => this.formComponent.disabled = false);
    }
  }

  isNotValidForm(): boolean {
    return !this.formComponent || this.formComponent.isNotValidForm() || this.formComponent.disabled;
  }

  delete(entity: T): void {
    this.provider.getEnvService().delete(entity.id).then(wrapper => {
      this.notification.wrapperMessage(wrapper);
    });
  }

  deleteAll(entities?: T[]): void {
    this.provider.getEnvService().deleteAll(entities ? entities : this.selectedEntities).then(wrapper => {
      this.notification.wrapperMessage(wrapper);
    });
  }

  setEntity(entity: T, menu: Menu, $event: MouseEvent): void {
    this.entity = entity;
    menu.toggle($event);
  }

  deleteConfimation(): void {
    this.confirmationService.confirm({
      message: constantes.deleteConfirmDialogMessage,
      header: constantes.deleteConfirmDialogHeader,
      icon: constantes.deleteConfirmDialogIcon,
      accept: () => this.delete(this.entity),
      reject: () => {
      },
      key: constantes.deleteConfirmDialogKey,
    });
  }
}
