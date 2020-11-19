import {AbstractEntity} from './abstract-entity';
import {Directive, ViewChild} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {AbstractFormComponent} from './abstract-form-component';
import {MenuItem, SortEvent} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {MenuItemImp} from '../class/menu-item-imp';
import {AbstractComponent} from './abstract-component';
import {Subscription} from 'rxjs';
import {constantes} from '../../../environments/constantes';
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
  F extends AbstractFormComponent<T, I, P>> extends AbstractComponent<T, I, P> {

  selectedEntities: T[] = [];
  entity: T;
  showFormDialog = false;
  @ViewChild('formComponent') formComponent: F;
  // @ViewChild('dt', {static: false}) table: Table;
  deleteConfirmDialogPosition = 'topright';
  loading = false;
  subscription: Subscription;
  rolesSubscription: Subscription;
  pagination: Pagination = new Pagination(0, constantes.rowsPerPageOptions[0], 0);
  formLink: string;

  haseAddRole = false;
  haseEditRole = false;
  haseDeleteRole = false;

  modalUpdateItem: MenuItem = new MenuItemImp(this.editLabel(), 'fa fa-pencil  fa-lg', () => this.enableDialog(this.entity));
  rediredUpdateItem: MenuItem = new MenuItemImp(this.editLabel(), 'pi pi-refresh', () => this.goToForm('/' + this.entity.id));
  deleteItem: MenuItem = new MenuItemImp(this.deleteLabel(), 'fa fa-trash fa-lg', () => this.deleteConfirmation());
  modalItems: MenuItem[] = [this.modalUpdateItem, this.deleteItem];
  redirectItems: MenuItem[] = [this.rediredUpdateItem, this.deleteItem];

  protected constructor(public provider: P,
                        public serviceUtils: ServiceUtils,
                        public i18nBase: string) {
    super(provider, serviceUtils, i18nBase);
    this.initAbstractList();
  }

  subscribe(): void {
    this.subscription = this.provider.getEnvService().error$.subscribe((error: string) => {
      if (error && error.length > 0) {
        this.serviceUtils.notificationService.showError(error).then();
      }
    });

    this.rolesSubscription = this.serviceUtils.authenficationProvider.getEnvService().roles.subscribe(() => {
      this.checkRoles();
    });
  }

  onDestroy(): void {
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
  }

  enableDialog(entity?: T): void {
    this.entity = entity ? Object.assign({}, entity) : this.getNewInstance();
    this.showFormDialog = true;
  }

  desabledDialog(): void {
    this.showFormDialog = false;
    if (this.formComponent) {
      this.formComponent.disabled = false;
    }
  }

  forUpdate(): boolean {
    return !!this.entity && !!this.entity.id;
  }

  saveOrUpdate(): void {
    this.forUpdate() ? this.updateAndGet() : this.createAndGet();
  }

  save(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.create().then(async () => {
        await this.reload();
        this.serviceUtils.notificationService.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  update(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.update().then(async () => {
        await this.reload();
        this.serviceUtils.notificationService.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  createAndGet(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.createAndGet(this.pagination).then(async () => {
        this.normaliseSelected();
        this.desabledDialog();
        this.serviceUtils.notificationService.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  updateAndGet(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.updateAndGet(this.pagination).then(async () => {
        this.normaliseSelected();
        this.desabledDialog();
        this.serviceUtils.notificationService.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  isNotValidForm(): boolean {
    return !this.formComponent || this.formComponent.isNotValidForm() || this.formComponent.disabled;
  }

  delete(entity: T): void {
    this.provider.getEnvService().delete(entity.id).then(async () => {
      await this.reload();
      this.serviceUtils.notificationService.showSuccess().then();
    });
  }

  deleteAndGet(entity: T): void {
    this.provider.getEnvService().deleteAndGet(this.pagination, entity.id).then(async () => {
      this.normaliseSelected();
      this.serviceUtils.notificationService.showSuccess().then();
    });
  }

  deleteAllAndGet(entities: T[] = this.selectedEntities, pagination: Pagination = this.pagination): void {
    this.provider.getEnvService().deleteAllAndGet(entities.filter(entity => this.showItemContextMenu(entity)), pagination)
      .then(async () => {
        this.normaliseSelected();
        this.serviceUtils.notificationService.showSuccess().then();
      });
  }

  deleteAll(entities: T[] = this.selectedEntities): void {
    this.provider.getEnvService().deleteAll(entities.filter(entity => this.showItemContextMenu(entity))).then(async () => {
      await this.reload();
      this.serviceUtils.notificationService.showSuccess().then();
    });
  }

  async setEntity(entity: T, event?: UIEvent, menu?: Menu): Promise<void> {
    await this.rebuidMenuItem(entity);
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
      message: await this.deleteConfirmeMessage(),
      header: await this.deleteConfirmeMessageHeader(),
      acceptLabel: this.yesLabel,
      rejectLabel: this.noLabel,
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => this.deleteAndGet(this.entity),
      reject: () => {
      },
      key: this.constantes.deleteConfirmDialogKey,
    });
  }

  async deleteAllConfimation(): Promise<void> {
    this.serviceUtils.confirmationService.confirm({
      message: await this.deleteAllConfirmeMessage(),
      header: await this.deleteConfirmeMessageHeader(),
      acceptLabel: this.yesLabel,
      rejectLabel: this.noLabel,
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => this.deleteAllAndGet(),
      reject: () => {
      },
      key: this.constantes.deleteConfirmDialogKey,
    });
  }

  onPage(event: { first: number; rows: number }): void {
    this.pagination.page = event.first === 0 ? 0 : +event.first / +event.rows;
    this.pagination.size = event.rows;
    this.reload().then();
  }

  onSort(event: SortEvent): void {
    this.pagination.page = 0;
    this.pagination.sort = event.field;
    this.pagination.direction = event.order;
    this.reload().then();
  }

  onFilter(event: { filteredValue: T[]; filters?: { [s: string]: FilterMetadata; } }, key: string = 'global'): void {

    if (key === constantes.globalFiltered) {
      this.pagination.globalFilter = event.filters && event.filters.global ? event.filters.global.value : undefined;
    }
    this.pagination.filters = event.filters;
    this.reload().then();
  }

  // LazyLoadEvent

  reload(pagination: Pagination = this.pagination): Promise<ResponseWrapper<T[]>> {
    const timer = setTimeout(() => this.loading = true, 230);
    return new Promise<ResponseWrapper<T[]>>((resolve, reject) => {
      this.provider.getEnvService().pageElements(pagination)
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

  async rebuidMenuItem(entity: T): Promise<void> {
  }

  showcontextMenuOption(): boolean {
    return true;
  }

  checkRoles(): void {
  }

  private initAbstractList(): void {
    this.subscribe();
    this.normaliseSelected();

    /*setInterval(() => {
      console.log('Class: AbstractListComponent, Function: , Line 57 , : '
      , );
      this.table.first = 2;
      this.table.firstChange.emit(this.table.first);
    }, 5000);*/
  }
}
