import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {HttpClient} from '@angular/common/http';
import {UserDomaine} from '../domain/user-domaine';
import {InterfaceUser} from '../domain/interface-user';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {Pagination} from '../../../../common/class/pagination';
import {TranslateService} from '@ngx-translate/core';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

@Injectable({providedIn: 'root'})
export class UserNodeService extends AbstractNodeService<UserDomaine> implements InterfaceUser {
  protected constructor(protected httpClient: HttpClient, protected translate: TranslateService) {
    super(httpClient, translate);
  }

  getPath(): string {
    return 'users';
  }

  activateAccount(pagination: Pagination, id: number | string): Promise<ResponseWrapper<UserDomaine[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<UserDomaine[]>>(this.getUrl(`activate/${id}`)
        , JSON.stringify(pagination), this.baseOption))
        .then((response: ResponseWrapper<UserDomaine[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomaine[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  disableAccount(pagination: Pagination, id: number | string): Promise<ResponseWrapper<UserDomaine[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<UserDomaine[]>>(this.getUrl(`disable/${id}`)
        , JSON.stringify(pagination), this.baseOption))
        .then((response: ResponseWrapper<UserDomaine[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomaine[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  activateAllAccount(entities: UserDomaine[], pagination: Pagination): Promise<ResponseWrapper<UserDomaine[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<UserDomaine[]>>(this.getUrl('activate-all'),
        JSON.stringify({pagination, ids: entities.map(value => value.id)}), this.baseOption))
        .then((response: ResponseWrapper<UserDomaine[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomaine[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  disableAllAccount(entities: UserDomaine[], pagination: Pagination): Promise<ResponseWrapper<UserDomaine[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<UserDomaine[]>>(this.getUrl('disable-all'),
        JSON.stringify({pagination, ids: entities.map(value => value.id)}), this.baseOption))
        .then((response: ResponseWrapper<UserDomaine[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomaine[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  resetPassword(id: string | number): Promise<ResponseWrapper<void>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.get<ResponseWrapper<void>>(this.getUrl(`reset-password/${id}`), this.baseOption))
        .then((response: ResponseWrapper<void>) => {
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomaine[]>) => {
          this.nextError(error, reject);
        });
    });
  }


}

