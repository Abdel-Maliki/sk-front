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

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

export abstract class ComponentCommon {
  readonly constantes = constantes;
  readonly dateHelpers = DateHelpers;

  protected constructor() {
  }

}
