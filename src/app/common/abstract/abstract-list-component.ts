import {AbstractEntity} from './abstract-entity';
import {Directive, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {NotificationService} from '../service/notification-service';
import {AbstractFormComponent} from './abstract-form-component';
import {ConfirmationService, MenuItem, SortEvent} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {MenuItemImp} from '../class/menu-item-imp';
import {TranslateService} from '@ngx-translate/core';
import {AbstractComponent} from './abstract-component';
import {Subscription} from 'rxjs';
import {constantes} from '../../../environments/constantes';
import {Pagination} from '../class/pagination';
import {ResponseWrapper} from '../class/response-wrapper';
import {FilterMetadata} from 'primeng/api/filtermetadata';
import {Router} from '@angular/router';
import {ContextMenu} from 'primeng/contextmenu';

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
  // @ViewChild('dt', {static: false}) table: Table;
  deleteConfirmDialogPosition = 'topright';
  loading = false;
  subscription: Subscription;
  pagination: Pagination = new Pagination(0, constantes.rowsPerPageOptions[0], 0);
  formLink: string;

  moalUpdateItem: MenuItem = new MenuItemImp(this.editLabel(), 'fa fa-pencil  fa-lg', () => this.enableDialog(this.entity));
  rediredUpdateItem: MenuItem = new MenuItemImp(this.editLabel(), 'pi pi-refresh', () => this.goToForm('/' + this.entity.id));
  deleteItem: MenuItem = new MenuItemImp(this.deleteLabel(), 'fa fa-trash fa-lg', () => this.deleteConfimation());
  modalItems: MenuItem[] = [this.moalUpdateItem, this.deleteItem];
  redirectItems: MenuItem[] = [this.rediredUpdateItem, this.deleteItem];

  protected constructor(public provider: P,
                        public notification: NotificationService,
                        public confirmationService: ConfirmationService,
                        public translate: TranslateService,
                        public router: Router,
                        public i18nBase: string) {
    super(provider, notification, translate, router, i18nBase);
  }

  ngOnInit(): void {
    this.subscribeError();

    /*setInterval(() => {
      console.log('Class: AbstractListComponent, Function: , Line 57 , : '
      , );
      this.table.first = 2;
      this.table.firstChange.emit(this.table.first);
    }, 5000);*/
  }

  subscribeError(): void {
    this.subscription = this.provider.getEnvService().error$.subscribe((error: string) => {
      if (error && error.length > 0) {
        this.notification.showError(error).then();
      }
    });
  }

  ngOnDestroy(): void {
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
        this.notification.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  update(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.update().then(async () => {
        await this.reload();
        this.notification.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  createAndGet(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.createAndGet(this.pagination).then(async () => {
        this.desabledDialog();
        this.notification.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  updateAndGet(): void {
    if (this.formComponent) {
      this.formComponent.disabled = true;
      this.formComponent.updateAndGet(this.pagination).then(async () => {
        this.desabledDialog();
        this.notification.showSuccess().then();
      }, () => this.formComponent.disabled = false);
    }
  }

  isNotValidForm(): boolean {
    return !this.formComponent || this.formComponent.isNotValidForm() || this.formComponent.disabled;
  }

  delete(entity: T): void {
    this.provider.getEnvService().delete(entity.id).then(async () => {
      await this.reload();
      this.notification.showSuccess().then();
    });
  }

  deleteAndGet(entity: T): void {
    this.provider.getEnvService().deleteAndGet(this.pagination, entity.id).then(async () => {
      this.notification.showSuccess().then();
    });
  }

  deleteAll(entities?: T[]): void {
    this.provider.getEnvService().deleteAll(entities ? entities : this.selectedEntities).then(async () => {
      await this.reload();
      this.notification.showSuccess().then();
    });
  }

  setEntity(entity: T, event?: UIEvent, menu?: Menu): void {
    this.entity = Object.assign({}, entity);
    if (menu && event && this.showContextMenu(entity)) {
      menu.toggle(event);
    }
    if (event) {
      event.preventDefault();
    }
  }

  async deleteConfimation(): Promise<void> {
    this.confirmationService.confirm({
      message: await this.deleteConfirmeMessage(),
      header: await this.deleteConfirmeMessageHeader(),
      acceptLabel: await this.yesLabel(),
      rejectLabel: await this.noLabel(),
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => this.deleteAndGet(this.entity),
      reject: () => {
      },
      key: this.constantes.deleteConfirmDialogKey,
    });
  }

  async deleteAllConfimation(): Promise<void> {
    this.confirmationService.confirm({
      message: await this.deleteAllConfirmeMessage(),
      header: await this.deleteConfirmeMessageHeader(),
      acceptLabel: await this.yesLabel(),
      rejectLabel: await this.noLabel(),
      icon: this.constantes.deleteConfirmDialogIcon,
      accept: () => this.deleteAll(),
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

  // LazyLoadEvent

  onFilter(event: { filteredValue: T[]; filters?: { [s: string]: FilterMetadata; } }, key: string = 'global'): void {

    if (key === constantes.globalFiltered) {
      this.pagination.globalFilter = event.filters && event.filters.global ? event.filters.global.value : undefined;
    }
    this.pagination.filters = event.filters;
    this.reload().then();
  }

  reload(pagination: Pagination = this.pagination): Promise<ResponseWrapper<T[]>> {
    const timer = setTimeout(() => this.loading = true, 230);
    return new Promise<ResponseWrapper<T[]>>((resolve, reject) => {
      this.provider.getEnvService().pageElements(pagination)
        .then(value => {
          clearTimeout(timer);
          this.loading = false;
          resolve(value);
        }).catch(reason => {
        clearTimeout(timer);
        this.loading = false;
        reject(reason);
      });
    });
  }

  onReject(): void {
    this.notification.messageService.clear('confirm');
  }

  goToForm(param: string = ''): void {
    this.goTo(this.formLink + param);
  }

  showContextMenu(entity: T): boolean {
    return true;
  }
}
