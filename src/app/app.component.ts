import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {PrimeNGConfig} from 'primeng/api';
import {constantes} from '../environments/constantes';
import {TranslateService} from '@ngx-translate/core';


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

  constructor(private router: Router,
              private primengConfig: PrimeNGConfig,
              public translate: TranslateService) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.router.events.subscribe(event => {
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
    }
    else {
      element.className += ' ' + className;
    }
  }

  removeClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    }
    else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

