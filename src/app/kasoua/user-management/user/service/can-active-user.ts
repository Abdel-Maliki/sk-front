import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {AuthProvider} from '../../../../front/classe/authentification-provider.service';
import {Helpers} from '../../../../common/class/helpers';
import {Roles} from '../../../../../constantes/roles';
import {UserDomain} from '../domain/user-domain';

/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */

@Injectable()
export class CanActiveUser implements CanActivate {
  constructor(protected authProvider: AuthProvider) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = PathHelpers.mapUrl(state.url);
    const allRoles: string[] = this.authProvider.getEnvService().rolesSubject.value;
    switch (url) {
      case PathHelpers.joinList(UserDomain.baseRoute):
        // tslint:disable-next-line:max-line-length
        return Helpers.haseSomeRoles(allRoles, [Roles.ADD_USER, Roles.EDIT_USER, Roles.READ_USER, Roles.RESET_PASSWORD, Roles.DELETE_USER, Roles.ACTIVATE_ACCOUNT, Roles.DISABLED_ACCOUNT]);
      case PathHelpers.joinFormNew(UserDomain.baseRoute):
        return Helpers.hasRole(allRoles, Roles.ADD_USER);
      case PathHelpers.joinFormUpdate(UserDomain.baseRoute):
        return Helpers.hasRole(allRoles, Roles.EDIT_USER);
      default:
        return false;
    }
  }

}
