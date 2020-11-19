import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {constantes} from '../environments/constantes';
import {AppConfigService} from './common/service/appconfigservice';
import {ServiceUtils} from './common/service/service-utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  menuActive = true;
  newsActive = false;
  constantes = constantes;

  public subscription: Subscription;

  constructor(public serviceUtils: ServiceUtils,
              private primengConfig: PrimeNGConfig,
              public configService: AppConfigService) {
    serviceUtils.authenficationProvider.getEnvService().loadCurrentUserDatas().toPromise().then();
    serviceUtils.translate.addLangs(['fr', 'en']);
    serviceUtils.translate.setDefaultLang('fr');
    serviceUtils.translate.use('fr');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.serviceUtils.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.hideMenu();
      }
    });

    this.newsActive = this.newsActive && sessionStorage.getItem('primenews-hidden') == null;
  }

  onMenuButtonClick(): void {
    this.menuActive = !this.menuActive;
    this.addClass(document.body, 'blocked-scroll');
  }

  onMaskClick(): void {
    this.hideMenu();
  }

  hideMenu(): void {
    this.menuActive = false;
    this.removeClass(document.body, 'blocked-scroll');
  }

  addClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  removeClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

