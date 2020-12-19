import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractListComponent} from '../../../../../common/abstract/abstract-list-component';
import {LogDomain, LogState} from '../../domain/log-domain';
import {InterfaceLog} from '../../service/interface-log';
import {LogProvider} from '../../service/log-provider';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';
import {i18nConstantes} from '../../../../../../constantes/i18n-constantes';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {UserProvider} from '../../../user/service/user-provider';
import {ResponseWrapper} from '../../../../../common/class/response-wrapper';

export enum Action {
  DELETE = 'DELETE',
  DELETE_ALL = 'DELETE_ALL',
}

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent extends AbstractListComponent<LogDomain, InterfaceLog, LogProvider, null>
  implements OnInit, OnDestroy {

  LOG_STATE = LogState;
  SUCCESS_LABEL: string;
  USER_ERROR_LABEL: string;
  SERVER_ERROR_LABEL: string;
  ALL_LABEL: string;
  actionControl: FormControl = new FormControl('');
  usernamesControl: FormControl = new FormControl('');
  rangeDatesControl: FormControl = new FormControl();
  statusControl: FormControl = new FormControl(null);
  errorMessageControl: FormControl = new FormControl();
  codeControl: FormControl = new FormControl([]);
  allUserNamesIsLoad = false;
  allUserNames: string[] = [];
  debounceVal = 500;
  maxDateValue = new Date();
  showDisplay = false;
  filterStatus: string[] = [this.ALL_LABEL, LogState.SUCCESS, LogState.USER_ERROR, LogState.SERVER_ERROR];
  action = Action;
  currentAction: Action;

  private readonly ERROR_CODES = [400, 401, 403, 404];
  private readonly SERVER_ERROR_CODES = [500];
  private readonly SUCCESS_CODES = [200];
  private readonly ALL_CODES = this.SUCCESS_CODES.concat(this.ERROR_CODES).concat(this.SERVER_ERROR_CODES);

  constructor(provider: LogProvider,
              protected userProvider: UserProvider,
              serviceUtils: ServiceUtils) {
    super(provider, serviceUtils, i18nConstantes.logBase);
  }

  get codesOptions(): number[] {
    const value: LogState & string = this.statusControl.value;
    if (!value) {
      return this.ALL_CODES;
    }
    switch (value) {
      case LogState.USER_ERROR:
        return this.ERROR_CODES;
      case LogState.SUCCESS:
        return this.SUCCESS_CODES;
      case LogState.SERVER_ERROR:
        return this.SERVER_ERROR_CODES;
      case this.ALL_LABEL:
        return this.ALL_CODES;
      default:
        this.helpers.fail(value);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.pagination.filters = {};
    this.modalItems = [this.DELETE_ITEM];
    this.subsCribSearch();
  }

  subsCribSearch(): void {
    this.actionControl.valueChanges.pipe(debounceTime(this.debounceVal)).subscribe((value: string) => {
      this.pagination.filters.action = value;
      this.reload().then();
    });

    this.usernamesControl.valueChanges.pipe(debounceTime(this.debounceVal)).subscribe(username => {
      this.pagination.filters.username = username;
      this.reload().then();
    });

    this.rangeDatesControl.valueChanges.subscribe(dates => {
      this.pagination.filters.dates = dates;
      this.reload().then();
    });

    this.statusControl.valueChanges.subscribe(status => {
      this.pagination.filters.status = status === this.ALL_LABEL ? null : status;
      this.codeControl.setValue((this.codeControl.value as number[]).filter(value => this.codesOptions.indexOf(value) >= 0));
    });

    this.errorMessageControl.valueChanges.pipe(debounceTime(this.debounceVal)).subscribe(errorMessage => {
      this.pagination.filters.errorMessage = errorMessage;
      this.reload().then();
    });

    this.codeControl.valueChanges.pipe(debounceTime(this.debounceVal)).subscribe(codes => {
      this.pagination.filters.codes = codes;
      this.reload().then();
    });
  }

  getNewInstance(): LogDomain {
    return new LogDomain();
  }

  checkRoles(): void {
    this.haseDeleteRole = this.hasRole(this.rolesConstantes.DELETE_LOG);
    super.checkRoles();
  }

  getLabels(): void {
    this.promiseI18nElement('successLabel').then(value => this.SUCCESS_LABEL = value);
    this.promiseI18nElement('userErrorLabel').then(value => this.USER_ERROR_LABEL = value);
    this.promiseI18nElement('serverErrorLabel').then(value => this.SERVER_ERROR_LABEL = value);
    this.promiseI18nElement('errorLabel').then(value => this.ALL_LABEL = value);
    this.serviceUtils.translate.get('allLabel').toPromise().then(value => this.ALL_LABEL = value);
    super.getLabels();
  }

  getAllUsernames(): void {
    if (this.allUserNamesIsLoad) {
      return;
    }
    this.allUserNamesIsLoad = true;
    this.userProvider.getEnvService().allUsernames().then((value: ResponseWrapper<string[]>) => {
      this.allUserNames = value.data;
    }).catch(reason => {
      this.allUserNamesIsLoad = false;
      this.getErrorMessageAndNext(reason);
    });
  }

  async enableDisplay(entity: LogDomain): Promise<void> {
    this.entity = entity;
    const responseWrapper = await this.provider.getEnvService().get(entity.id);
    this.entity = responseWrapper.data;
    this.showDisplay = true;
  }

  disableDisplay(): void {
    this.showDisplay = false;
  }

  async validateAction(): Promise<void> {
    switch (this.currentAction) {
      case Action.DELETE:
        await this.deleteAndGet(this.entity, this.lastPasswordObject);
        this.disablePasswordConfirmation();
        break;
      case Action.DELETE_ALL:
        await this.deleteAllAndGet(this.selectedEntities, this.pagination, this.lastPasswordObject);
        this.disablePasswordConfirmation();
        break;
      default:
        this.helpers.fail(this.currentAction);
    }
  }

  enablePasswordConfirmation(param: { action: Action, log: LogDomain }): void {
    this.currentAction = param.action;
    if (param.log) {
      this.entity = param.log;
    }
    this.visibleConfirmPassword = true;
  }

  disablePasswordConfirmation(): void {
    this.visibleConfirmPassword = false;
  }

  showContextMenuOption(): boolean {
    return this.haseDeleteRole;
  }

}
