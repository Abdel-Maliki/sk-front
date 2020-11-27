import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {UserDomain} from '../domain/user-domain';
import {constantes} from '../../../../../environments/constantes';
import {UserProvider} from '../service/user-provider';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

@Injectable({providedIn: 'root'})
export class UserListResolver implements Resolve<ResponseWrapper<UserDomain[]>> {
  constructor(protected provider: UserProvider) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResponseWrapper<UserDomain[]>> {
    return this.provider.getEnvService().pageElements({page: 0, size: constantes.rowsPerPageOptions[0]});
  }
}

