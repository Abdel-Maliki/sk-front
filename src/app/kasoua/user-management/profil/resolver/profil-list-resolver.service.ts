import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProfileProvider} from '../service/profile-provider';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {ProfileDomaine} from '../domain/profile-domaine';
import {constantes} from '../../../../../environments/constantes';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

@Injectable({providedIn: 'root'})
export class ProfilListResolverService implements Resolve<ResponseWrapper<ProfileDomaine[]>> {
  constructor(public profileProvider: ProfileProvider) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResponseWrapper<ProfileDomaine[]>> {
    return this.profileProvider.getEnvService().pageElements(0, constantes.defaultPageSize);
  }
}
