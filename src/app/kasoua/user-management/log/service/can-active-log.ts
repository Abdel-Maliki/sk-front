import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {AuthProvider} from '../../../../front/classe/authentification-provider.service';
import {RouteConstantes} from '../../../../../environments/route-constantes';
import {Helpers} from '../../../../common/class/helpers';
import {Roles} from '../../../../../environments/roles';

/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */

@Injectable()
export class CanActiveLog implements CanActivate {
  private readonly LOG_BASE: string = PathHelpers.join([RouteConstantes.USER_MANAGEMENT, RouteConstantes.LOG]);

  constructor(protected authProvider: AuthProvider) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = PathHelpers.mapUrl(state.url);
    const allRoles: string[] = this.authProvider.getEnvService().rolesSubject.value;
    console.log('Class: CanActiveLog, Function: canActivate, Line 26 url(): '
    , url);
    switch (url) {
      case PathHelpers.joinList(this.LOG_BASE):
        return Helpers.haseSomeRoles(allRoles, [Roles.DELETE_LOG, Roles.READ_LOG]);
      default:
        return false;
    }
  }

}
