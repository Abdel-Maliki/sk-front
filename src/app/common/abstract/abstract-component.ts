import {AbstractEntity} from './abstract-entity';
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {NotificationService} from '../service/notification-service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentCommon} from './component-common';
import {Router} from '@angular/router';
import {ServiceUtils} from '../service/service-utils.service';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */
@Directive()
export abstract class AbstractComponent<T extends AbstractEntity<T>,
  I extends InterfaceService<T>,
  P extends AbstractServiceProvider<T, I>> extends ComponentCommon implements OnInit, OnDestroy{


  protected constructor(public provider: P,
                        public serviceUtils: ServiceUtils,
                        public i18nBase: string) {
    super(serviceUtils, i18nBase );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  goTo(link: string): void {
    this.serviceUtils.router.navigateByUrl(link).then();
  }

  abstract getNewInstance(): T;
}
