import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {UserDomain} from '../domain/user-domain';
import {InterfaceUser} from './interface-user';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {Pagination} from '../../../../common/class/pagination';
import {NodeServiceData} from '../../../../common/abstract/node-service-data';
import {Injectable} from '@angular/core';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

@Injectable({providedIn: 'root'})
export class UserNodeService extends AbstractNodeService<UserDomain> implements InterfaceUser {
  constructor(data: NodeServiceData) {
    super(data);
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
        , JSON.stringify({pagination, others: {password}}), this.baseOption))
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
        , JSON.stringify({pagination, others: {password}}), this.baseOption))
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
        JSON.stringify({others: {password}, pagination, ids: entities.map(value => value.id)}), this.baseOption))
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
        JSON.stringify({others: {password}, pagination, ids: entities.map(value => value.id)}), this.baseOption))
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
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<void>>(this.getUrl(`reset-password/${id}`),
        {others: {password}}, this.baseOption))
        .then((response: ResponseWrapper<void>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(response);
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  allUsernames(): Promise<ResponseWrapper<string[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.get<ResponseWrapper<string[]>>(this.getUrl('all-user-name'), this.baseOption))
        .then((value: ResponseWrapper<string[]>) => {
          this.data.passwordStateService.setStateToValid();
          resolve(value);
        })
        .catch((error) => {
          this.nextError(error, reject);
        });
    });
  }

  create(entity: UserDomain, others?: any): Promise<ResponseWrapper<UserDomain>> {
    return new Promise<ResponseWrapper<UserDomain>>((resolve, reject) => {
      super.create(entity, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  update(entity: UserDomain, id: number | string, others?: any): Promise<ResponseWrapper<UserDomain>> {
    return new Promise<ResponseWrapper<UserDomain>>((resolve, reject) => {
      super.update(entity, id, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  createAndGet(data: { entity: UserDomain; pagination: Pagination }, others?: any): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise<ResponseWrapper<UserDomain[]>>((resolve, reject) => {
      super.createAndGet(data, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  updateAndGet(data: { entity: UserDomain; pagination: Pagination }, id: string | number, others?: any):
    Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise<ResponseWrapper<UserDomain[]>>((resolve, reject) => {
      super.updateAndGet(data, id, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  deleteAll(entities: UserDomain[], others?: any): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise<ResponseWrapper<UserDomain[]>>((resolve, reject) => {
      super.deleteAll(entities, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  deleteAllAndGet(entities: UserDomain[], pagination: Pagination, others?: any): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise<ResponseWrapper<UserDomain[]>>((resolve, reject) => {
      super.deleteAllAndGet(entities, pagination, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  deleteAndGet(pagination: Pagination, id: string | number, others?: any): Promise<ResponseWrapper<UserDomain[]>> {
    return new Promise<ResponseWrapper<UserDomain[]>>((resolve, reject) => {
      super.deleteAndGet(pagination, id, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  delete(id: number | string, others?: any): Promise<ResponseWrapper<UserDomain>> {
    return new Promise<ResponseWrapper<UserDomain>>((resolve, reject) => {
      super.delete(id, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  forgotPasswordRequest(email: string): Promise<ResponseWrapper<void>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<void>>(this.getUrl(`forget-password-request`)
        , JSON.stringify({email}), this.baseOption))
        .then(() => {
          this.data.passwordStateService.setStateToValid();
          resolve();
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  forgotPasswordFinalisation(token: string, password: string): Promise<ResponseWrapper<void>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<void>>(this.getUrl(`forget-password-finatisation`)
        , JSON.stringify({token, password}), this.baseOption))
        .then(() => {
          this.data.passwordStateService.setStateToValid();
          resolve();
        })
        .catch((error: ResponseWrapper<UserDomain[]>) => {
          this.nextError(error, reject);
        });
    });
  }
}

