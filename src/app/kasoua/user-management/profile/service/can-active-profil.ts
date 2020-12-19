import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {AuthProvider} from '../../../../front/classe/authentification-provider.service';
import {Helpers} from '../../../../common/class/helpers';
import {Roles} from '../../../../../constantes/roles';
import {ProfileDomaine} from '../domain/profile-domaine';

/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */

@Injectable()
export class CanActiveProfil implements CanActivate {
  constructor(protected authProvider: AuthProvider) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = PathHelpers.mapUrl(state.url);
    const allRoles: string[] = this.authProvider.getEnvService().rolesSubject.value;

    switch (url) {
      case PathHelpers.joinList(ProfileDomaine.baseRoute):
        // tslint:disable-next-line:max-line-length
        return Helpers.haseSomeRoles(allRoles, [Roles.ADD_PROFILE, Roles.EDIT_PROFILE, Roles.READ_PROFILE, Roles.DELETE_PROFILE, Roles.AFFECT_PROFILE_ROLE]);
      case PathHelpers.joinFormNew(ProfileDomaine.baseRoute):
        return Helpers.hasRole(allRoles, Roles.ADD_PROFILE);
      case PathHelpers.joinFormUpdate(ProfileDomaine.baseRoute):
        return Helpers.hasRole(allRoles, Roles.EDIT_PROFILE);
      default:
        return false;
    }
  }

}
