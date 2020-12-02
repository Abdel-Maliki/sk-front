import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthProvider} from '../classe/authentification-provider.service';
import {AppConfigService} from '../../common/service/appconfigservice';


/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authProvider: AuthProvider,
    private appConfigService: AppConfigService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authProvider.getEnvService().userValue;
    if (!user) {
      this.appConfigService.updateConfig(
        {...this.appConfigService.getConfig() , menuLeft: false, toolbare: false});
      return true;
    }
    this.router.navigate(['']).then();
    return false;
  }
}
