import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {ProfileDomaine} from '../domain/profile-domaine';
import {HttpClient} from '@angular/common/http';
import {InterfaceProfile} from '../domain/interface-profile';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {TranslateService} from '@ngx-translate/core';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

@Injectable({providedIn: 'root'})
export class ProfilNodeService extends AbstractNodeService<ProfileDomaine> implements InterfaceProfile {
  protected constructor(protected httpClient: HttpClient, protected translate: TranslateService) {
    super(httpClient, translate);
  }

  getPath(): string {
    return 'profiles';
  }

  getRoles(id: number | string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.mapQuery<string[]>(this.httpClient.get<ResponseWrapper<string[]>>(this.getUrl(`roles/${id}`), this.baseOption))
        .then((value: ResponseWrapper<string[]>) => {
          resolve(value.data);
        })
        .catch((error: ResponseWrapper<string[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  setRoles(id: number | string, roles: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mapQuery<string[]>(this.httpClient.put<ResponseWrapper<string[]>>(this.getUrl(`set-roles/${id}`), roles, this.baseOption))
        .then(() => {
          resolve();
        })
        .catch((error: ResponseWrapper<string[]>) => {
          this.nextError(error, reject);
        });
    });
  }
}
