import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {ProfileDomaine} from '../domain/profile-domaine';
import {InterfaceProfile} from '../domain/interface-profile';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {NodeServiceData} from '../../../../common/abstract/node-service-data';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

@Injectable({providedIn: 'root'})
export class ProfileNodeService extends AbstractNodeService<ProfileDomaine> implements InterfaceProfile {

  protected constructor(data: NodeServiceData) {
    super(data);
  }

  getPath(): string {
    return 'profiles';
  }

  getRoles(id: number | string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.mapQuery<string[]>(this.data.httpClient.get<ResponseWrapper<string[]>>(this.getUrl(`roles/${id}`), this.baseOption))
        .then((value: ResponseWrapper<string[]>) => {
          resolve(value.data);
        })
        .catch((error: ResponseWrapper<string[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  setRoles(id: number | string, roles: string[], password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mapQuery<string[]>(this.data.httpClient
        .put<ResponseWrapper<string[]>>(this.getUrl(`set-roles/${id}`), {roles, others: {password}}, this.baseOption))
        .then(() => {
          this.data.passwordStateService.setStateToValid();
          resolve();
        })
        .catch((error: ResponseWrapper<string[]>) => {
          this.nextError(error, reject);
        });
    });
  }
}
