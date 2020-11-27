import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {UserDomain} from '../domain/user-domain';
import {InterfaceUser} from './interface-user';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {Pagination} from '../../../../common/class/pagination';
import {NodeServiceData} from '../../../../common/abstract/node-service-data';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

@Injectable({providedIn: 'root'})
export class UserNodeService extends AbstractNodeService<UserDomain> implements InterfaceUser {
  protected constructor(data: NodeServiceData) {
    super(data);
  }

  create(entity: UserDomain, password): Promise<ResponseWrapper<UserDomain>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<UserDomain>>(this.getUrl(),
        JSON.stringify({entity, password: password['0']['0']['0']}), this.baseOption))
        .then((value: ResponseWrapper<UserDomain>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(value);
        })
        .catch((error) => {
          this.nextError(error, reject);
        });
    });
  }

  update(entity: UserDomain, id: number | string, password): Promise<ResponseWrapper<UserDomain>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain>>(this.getUrl(`update/${id}`),
        JSON.stringify({entity, password: password['0']['0']['0']}), this.baseOption))
        .then((value: ResponseWrapper<UserDomain>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(value);
        })
        .catch((error: ResponseWrapper<UserDomain>) => {
          this.nextError(error, reject);
        });
    });
  }

  createAndGet(data: { entity: UserDomain; pagination: Pagination; }, password): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<UserDomain[]>>(this.getUrl(`create/and-get`),
        JSON.stringify({entity: data.entity, pagination: data.pagination, password: password['0']['0']['0']}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  updateAndGet(data: { entity: UserDomain; pagination: Pagination; }, id: string | number, password)
    : Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl(`/update/and-get/${id}`),
        JSON.stringify({entity: data.entity, pagination: data.pagination, password: password['0']['0']['0']}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  updateMyPassword(oldPassword: string, newPassword: string): Promise<ResponseWrapper<{ token: string; }>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<{ token: string; }>>(this.getUrl(`update-my-password`)
        , JSON.stringify({oldPassword, newPassword}), this.baseOption))
        .then((response: ResponseWrapper<{ token: string; }>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          reject(error);
        });
    });
  }

  getPath(): string {
    return 'users';
  }

  activateAccount(pagination: Pagination, id: number | string, password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl(`activate/${id}`)
        , JSON.stringify({pagination, password}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  disableAccount(pagination: Pagination, id: number | string, password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl(`disable/${id}`)
        , JSON.stringify({pagination, password}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  activateAllAccount(entities: UserDomain[], pagination: Pagination, password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl('activate-all'),
        JSON.stringify({password, pagination, ids: entities.map(value => value.id)}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  disableAllAccount(entities: UserDomain[], pagination: Pagination, password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl('disable-all'),
        JSON.stringify({password, pagination, ids: entities.map(value => value.id)}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  resetPassword(id: string | number, password: string): Promise<ResponseWrapper<void>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<void>>(this.getUrl(`reset-password/${id}`), {password}, this.baseOption))
        .then((response: ResponseWrapper<void>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  delete(id: number | string, password: string): Promise<ResponseWrapper<UserDomain>> {
    return new Promise((resolve, reject) => {
      this.mapQuery<UserDomain>(this.data.httpClient.put<ResponseWrapper<UserDomain>>(this.getUrl(`delete/${id}`)
        , {password}, this.baseOption))
        .then((value: any) => {
          this.data.passwordStateService.setStateToValid();
          resolve(value);
        })
        .catch((error: ResponseWrapper<UserDomain>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAndGet(pagination: Pagination, id: string | number, password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl(`delete/and-get/${id}`)
        , JSON.stringify({pagination, password}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAllAndGet(entities: UserDomain[], pagination: Pagination, password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl('delete-all/and-get'),
        JSON.stringify({pagination, ids: entities.map(value => value.id), password}), this.baseOption))
        .then((response: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAll(entities: UserDomain[], password: string): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<UserDomain[]>>(this.getUrl('delete/all'),
        JSON.stringify({ids: entities.map(value => value.id), password}), this.baseOption))
        .then((value: ResponseWrapper<UserDomain[]>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(value);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }
}

