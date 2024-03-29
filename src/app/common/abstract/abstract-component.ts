import {AbstractEntity} from './abstract-entity';
import {Directive, OnDestroy, OnInit} from '@angular/core';
import {AbstractServiceProvider} from './abstract-service-provider';
import {InterfaceService} from '../interface/interface-service';
import {ComponentCommon} from './component-common';
import {ServiceUtils} from '../service/service-utils.service';
import {Subscription} from 'rxjs';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */
@Directive()
export abstract class AbstractComponent<T extends AbstractEntity<T>,
  I extends InterfaceService<T>,
  P extends AbstractServiceProvider<T, I>> extends ComponentCommon implements OnInit, OnDestroy {


  subscription: Subscription;
  rolesSubscription: Subscription;


  protected constructor(public provider: P,
                        public serviceUtils: ServiceUtils,
                        public i18nBase: string) {
    super(serviceUtils, i18nBase);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscribe();

  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  goTo(link: string): void {
    this.serviceUtils.router.navigateByUrl(link).then();
  }

  abstract getNewInstance(): T;

  subscribe(): void {
    this.subscription = this.provider.getEnvService().error$.subscribe((error: string) => {
      if (error && error.length > 0) {
        this.serviceUtils.notificationService.showError(error).then();
      }
    });

    this.rolesSubscription = this.serviceUtils.authProvider.getEnvService().rolesSubject.subscribe(() => {
      this.checkRoles();
    });
  }

  checkRoles(): void {
  }
}
