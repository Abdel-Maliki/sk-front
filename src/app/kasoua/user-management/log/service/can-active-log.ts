import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {AuthProvider} from '../../../../front/classe/authentification-provider.service';
import {Helpers} from '../../../../common/class/helpers';
import {Roles} from '../../../../../constantes/roles';
import {LogDomain} from '../domain/log-domain';

/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */

@Injectable()
export class CanActiveLog implements CanActivate {

  constructor(protected authProvider: AuthProvider) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = PathHelpers.mapUrl(state.url);
    const allRoles: string[] = this.authProvider.getEnvService().rolesSubject.value;
    switch (url) {
      case PathHelpers.joinList(LogDomain.baseRoute):
        return Helpers.haseSomeRoles(allRoles, [Roles.DELETE_LOG, Roles.READ_LOG]);
      default:
        return false;
    }
  }

}
