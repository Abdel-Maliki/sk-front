import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {UserDomaine} from '../domain/user-domaine';
import {UserProvider} from '../service/user-provider';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

@Injectable({
  providedIn: 'root'
})
export class UserFormResolver implements Resolve<ResponseWrapper<UserDomaine>> {

  constructor(protected provider: UserProvider) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<ResponseWrapper<UserDomaine>> {
    return this.provider.getEnvService().resolverFormJob(route);
  }
}

