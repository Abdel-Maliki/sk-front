import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, UrlSegment, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthProvider} from '../classe/authentification-provider.service';
import {AppConfigService} from '../../common/service/appconfigservice';


/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authProvider: AuthProvider,
    private appConfigService: AppConfigService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.hasAuthentificated(state);
  }

  private hasAuthentificated(state: RouterStateSnapshot): boolean {
    const user = this.authProvider.getEnvService().userValue;
    if (user) {
      this.appConfigService.updateConfig(
        {...this.appConfigService.getConfig(), menuLeft: true, toolbare: true});
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
