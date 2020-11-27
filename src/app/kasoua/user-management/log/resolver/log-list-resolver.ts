import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {constantes} from '../../../../../environments/constantes';
import {LogDomain} from '../domain/log-domain';
import {LogProvider} from '../service/log-provider';

/**
 * @author abdel-maliki
 * Date : 27/11/2020
 */

@Injectable({providedIn: 'root'})
export class LogListResolver implements Resolve<ResponseWrapper<LogDomain[]>> {
  constructor(protected provider: LogProvider) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResponseWrapper<LogDomain[]>> {
    return this.provider.getEnvService().pageElements({page: 0, size: constantes.rowsPerPageOptions[0]});
  }
}
