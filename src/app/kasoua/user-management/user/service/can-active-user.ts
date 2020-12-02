import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {RouteConstantes} from '../../../../../environments/route-constantes';
import {AuthProvider} from '../../../../front/classe/authentification-provider.service';
import {Helpers} from '../../../../common/class/helpers';
import {Roles} from '../../../../../environments/roles';

/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */

@Injectable()
export class CanActiveUser implements CanActivate {
  private readonly USER_BASE: string = PathHelpers.join([RouteConstantes.USER_MANAGEMENT, RouteConstantes.USER]);

  constructor(protected authProvider: AuthProvider) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = PathHelpers.mapUrl(state.url);
    const allRoles: string[] = this.authProvider.getEnvService().rolesSubject.value;
    console.log('Class: CanActiveUserManagementChild, Function: canActivate, Line 26 url(): '
    , url);
    switch (url) {
      // User
      case PathHelpers.joinList(this.USER_BASE):
        // tslint:disable-next-line:max-line-length
        return Helpers.haseSomeRoles(allRoles, [Roles.ADD_USER, Roles.EDIT_USER, Roles.READ_USER, Roles.RESET_PASSWORD, Roles.DELETE_USER, Roles.ACTIVATE_ACCOUNT, Roles.DISABLED_ACCOUNT]);
      case PathHelpers.joinFormNew(this.USER_BASE):
        return Helpers.hasRole(allRoles, Roles.ADD_USER);
      case PathHelpers.joinFormUpdate(this.USER_BASE):
        return Helpers.hasRole(allRoles, Roles.EDIT_USER);
      default:
        return false;
    }
  }

}
