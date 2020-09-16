import {AbstractEntity} from './abstract-entity';
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {NotificationService} from '../service/notification-service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentCommon} from './component-common';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */
@Directive()
export abstract class AbstractComponent<T extends AbstractEntity<T>,
  I extends InterfaceService<T>,
  P extends AbstractServiceProvider<T, I>> extends ComponentCommon implements OnInit, OnDestroy {


  protected constructor(public provider: P,
                        public notification: NotificationService,
                        public translate: TranslateService) {
    super();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }


}
