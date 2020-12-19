import {AbstractEntity} from './abstract-entity';
import {Directive, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {AbstractFormComponent} from './abstract-form-component';
import {MenuItem, SortEvent} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {MenuItemImp} from '../class/menu-item-imp';
import {AbstractComponent} from './abstract-component';
import {Subscription} from 'rxjs';
import {constantes} from '../../../constantes/constantes';
import {Pagination} from '../class/pagination';
import {ResponseWrapper} from '../class/response-wrapper';
import {FilterMetadata} from 'primeng/api/filtermetadata';
import {ServiceUtils} from '../service/service-utils.service';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

@Directive()
export abstract class AbstractListComponent<T extends AbstractEntity<T>,
  I extends InterfaceService<T>,
  P extends AbstractServiceProvider<T, I>,
  F extends AbstractFormComponent<T, I, P>> extends AbstractComponent<T, I, P> implements OnInit, OnDestroy {

  selectedEntities: T[] = [];
  entity: T;
  showFormDialog = false;
  @ViewChild('formComponent') formComponent: F;
  @ViewChild('btn') btn: ElementRef;

  // @ViewChild('dt', {static: false}) table: Table;
  deleteConfirmDialogPosition = 'topright';
  loading = false;
  pagination: Pagination = new Pagination(0, constantes.rowsPerPageOptions[0], {}, undefined, undefined, undefined);
  formLink: string;

  haseAddRole = false;
  haseEditRole = false;
  haseDeleteRole = false;

  modalUpdateItem: MenuItem = new MenuItemImp(this.editLabel(), 'fa fa-pencil  fa-lg', () => this.enableDialog(this.entity));
  redirectUpdateItem: MenuItem = new MenuItemImp(this.editLabel(), 'pi pi-refresh', () => this.goToForm('/' + this.entity.id));
  DELETE_ITEM: MenuItem = new MenuItemImp(this.deleteLabel(), 'fa fa-trash fa-lg', () => this.deleteConfirmation());
  modalItems: MenuItem[] = [this.modalUpdateItem, this.DELETE_ITEM];
  redirectItems: MenuItem[] = [this.redirectUpdateItem, this.DELETE_ITEM];

  protected constructor(public provider: P,
                        public serviceUtils: ServiceUtils,
                        public i18nBase: string) {
    super(provider, serviceUtils, i18nBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.normaliseSelected();

    /*setInterval(() => {
      console.log('Class: AbstractListComponent, Function: , Line 57 , : '
      , );
      this.table.first = 2;
      this.table.firstChange.emit(this.table.first);
    }, 5000);*/
  }

  ngOnDestroy(): void {
    this.provider.getEnvService().error$.next(null);
    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.provider.getEnvService().pageSubscrption) {
      this.provider.getEnvService().pageSubscrption.unsubscribe();
    }
    super.ngOnDestroy();
  }

  enableDialog(entity?: T): void {
    this.entity = entity ? Object.assign({}, entity) : this.getNewInstance();
    this.showFormDialog = true;
  }

  disabledDialog(): void {
    this.showFormDialog = false;
    if (this.formComponent) {
      this.formComponent.disabled = false;
    }
  }

  forUpdate(): boolean {
    return !!this.entity && !!this.entity.id;
  }

  saveOrUpdate(others?: any): Promise<ResponseWrapper<T[]>> {
    return this.forUpdate()
      ? this.updateAndGet(this.pagination, this.entity, this.entity.id, others)
      : this.createAndGet(this.pagination, this.entity, others);
  }

  save(entity: T = this.entity, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise<ResponseWrapper<T>>((resolve, reject) => {
      if (this.formComponent) {
        this.formComponent.disabled = true;
        this.formComponent.create(entity, others).then(async (value) => {
          await this.reload(this.pagination, others);
          this.serviceUtils.notificationService.showSuccess().then();
          resolve(value);
        }, (error) => {
          this.formComponent.disabled = false;
          reject(error);
        });
      } else {
        reject();
      }
    });
  }

  update(id: number | string = this.entity.id, entity: T = this.entity, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise<ResponseWrapper<T>>((resolve, reject) => {
      if (this.formComponent) {
        this.formComponent.disabled = true;
        this.formComponent.update(id, entity, others).then(async (value) => {
          await this.reload(this.pagination, others);
          this.serviceUtils.notificationService.showSuccess().then();
          resolve(value);
        }, (error) => {
          this.formComponent.disabled = false;
          reject(error);
        });
      } else {
        reject();
      }
    });
  }

  createAndGet(pagination: Pagination = this.pagination, entity: T = this.entity, others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>((resolve, reject) => {
      if (this.formComponent) {
        this.formComponent.disabled = true;
        this.formComponent.createAndGet(pagination, entity, others).then((value) => {
          this.normaliseSelected();
          this.disabledDialog();
          resolve(value);
          this.serviceUtils.notificationService.showSuccess().then();
        }, (error) => {
          this.formComponent.disabled = false;
          reject(error);
        });
      } else {
        reject();
      }
    });
  }

  updateAndGet(pagination: Pagination = this.pagination, entity: T = this.entity, id: number | string = this.entity.id, others?: any)
    : Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>((resolve, reject) => {
      if (this.formComponent) {
        this.formComponent.disabled = true;
        this.formComponent.updateAndGet(pagination, entity, entity.id, others).then(async (value) => {
          this.normaliseSelected();
          this.disabledDialog();
          this.serviceUtils.notificationService.showSuccess().then();
          resolve(value);
        }, (error) => {
          this.formComponent.disabled = false;
          reject(error);
        });
      } else {
        reject();
      }
    });
  }

  isNotValidForm(): boolean {
    return !this.formComponent || this.formComponent.isNotValidForm() || this.formComponent.disabled;
  }

  delete(entity: T, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise<ResponseWrapper<T>>((resolve, reject) => {
      this.provider.getEnvService().delete(entity.id, others).then(async (value) => {
        await this.reload(this.pagination, others);
        this.serviceUtils.notificationService.showSuccess().then();
        resolve(value);
      }).catch(reason => reject(reason));
    });
  }

  async deleteAndGet(entity: T = this.entity, others?: any): Promise<ResponseWrapper<T[]>> {
    const data = await this.provider.getEnvService().deleteAndGet(this.pagination, entity.id, others);
    this.normaliseSelected();
    this.serviceUtils.notificationService.showSuccess().then();
    return data;
  }

  async deleteAllAndGet(selectedEntities: T[] = this.selectedEntities, pagination: Pagination = this.pagination, others?: any)
    : Promise<ResponseWrapper<T[]>> {
    const data = await this.provider.getEnvService()
      .deleteAllAndGet(selectedEntities.filter(entity => this.showItemContextMenu(entity)), pagination, others);
    this.normaliseSelected();
    this.serviceUtils.notificationService.showSuccess().then();
    return data;
  }

  async deleteAll(entities: T[] = this.selectedEntities, others?: any): Promise<ResponseWrapper<T[]>> {
    const data = await this.provider.getEnvService().deleteAll(entities.filter(entity => this.showItemContextMenu(entity)), others);
    await this.reload(this.pagination, others);
    this.serviceUtils.notificationService.showSuccess().then();
    return data;
  }

  async setEntity(entity: T, event?: UIEvent, menu?: Menu): Promise<void> {
    this.event = event;
    await this.rebuildMenuItem(entity);
    this.entity = Object.assign({}, entity);
    if (menu && event && this.showItemContextMenu(entity)) {
      menu.toggle(event);
    }
    if (event) {
      event.preventDefault();
    }

  }

  async deleteConfirmation(): Promise<void> {
    this.serviceUtils.confirmationService.confirm({
      message: this.deleteConfirmDialogMessage,
      header: this.deleteConfirmDialogHeader,
      acceptLabel: this.yesLabel,
      rejectLabel: this.noLabel,
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => this.deleteAndGet(this.entity),
      reject: () => {
      },
      key: this.constantes.deleteConfirmDialogKey,
    });
  }

  async deletePopupConfirm(event: Event, entity: T = this.entity, others?: any): Promise<void> {
    this.entity = entity;
    await this.confirmPopup(event, this.deleteConfirmDialogMessage, () => this.deleteAndGet(entity, others));
  }

  async deleteAllPopupConfirm(event: Event,
                              selectedEntities: T[] = this.selectedEntities,
                              pagination: Pagination = this.pagination,
                              others?: any)
    : Promise<void> {
    this.selectedEntities = selectedEntities;
    this.pagination = pagination;
    await this.confirmPopup(event, this.deleteAllConfirmDialogMessage,
      () => this.deleteAllAndGet(selectedEntities, pagination, others));
  }

  onPage(event: { first: number; rows: number }, others?: any): Promise<ResponseWrapper<T[]>> {
    this.pagination.page = event.first === 0 ? 0 : +event.first / +event.rows;
    this.pagination.size = event.rows;
    return this.reload(this.pagination, others).then();
  }

  onSort(event: SortEvent, others?: any): Promise<ResponseWrapper<T[]>> {
    this.pagination.page = 0;
    this.pagination.sort = event.field;
    this.pagination.direction = event.order;
    return this.reload(this.pagination, others).then();
  }

  onFilter(event: { filteredValue: T[]; filters?: { [s: string]: FilterMetadata; } }, key: string = 'global', others?: any)
    : Promise<ResponseWrapper<T[]>> {

    if (key === constantes.globalFiltered) {
      this.pagination.globalFilter = event.filters && event.filters.global ? event.filters.global.value : undefined;
    }
    this.pagination.filters = event.filters;
    return this.reload(this.pagination, others).then();
  }

  // LazyLoadEvent

  reload(pagination: Pagination = this.pagination, others?: any): Promise<ResponseWrapper<T[]>> {
    const timer = setTimeout(() => this.loading = true, 230);
    return new Promise<ResponseWrapper<T[]>>((resolve, reject) => {
      this.provider.getEnvService().pageElements(pagination, others)
        .then(value => {
          clearTimeout(timer);
          this.loading = false;
          this.normaliseSelected();
          resolve(value);
        }).catch(reason => {
        clearTimeout(timer);
        this.loading = false;
        reject(reason);
      });
    });
  }

  onReject(): void {
    this.serviceUtils.notificationService.messageService.clear('confirm');
  }

  goToForm(param: string = ''): void {
    this.goTo(this.formLink + param);
  }

  showItemContextMenu(entity: T): boolean {
    return true;
  }

  validateEntries(): T[] {
    return this.selectedEntities ? this.selectedEntities.filter(value => this.showItemContextMenu(value)) : [];
  }

  normaliseSelected(): void {
    this.selectedEntities = this.selectedEntities
      .filter(value => this.provider.getEnvService().pageElements$.value.map(value1 => value1.id).indexOf(value.id) >= 0)
      .filter(value => this.showItemContextMenu(value))
      .concat(this.provider.getEnvService().pageElements$.value.filter(value => !this.showItemContextMenu(value)));
  }

  async rebuildMenuItem(entity: T): Promise<void> {
  }

  showContextMenuOption(): boolean {
    return true;
  }

  getErrorMessageAndNext<ERROR>(responseWrapper: ResponseWrapper<ERROR>): string | null {
    if (responseWrapper && responseWrapper.error && responseWrapper.error.message){
      this.provider.getEnvService().error$.next(responseWrapper.error.message);
      return responseWrapper.error.message;
    }
    return;
  }
}
