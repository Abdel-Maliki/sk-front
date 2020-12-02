import {InterfaceService} from '../interface/interface-service';
import {AbstractEntity} from './abstract-entity';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {ResponseWrapper} from '../class/response-wrapper';
import {environment} from '../../../environments/environment';
import {HeadersOptions, HttpHelpers} from '../class/http-helpers';
import {map} from 'rxjs/operators';
import {Pagination} from '../class/pagination';
import {ActivatedRouteSnapshot} from '@angular/router';
import {i18nConstantes} from '../../../constantes/i18n-constantes';
import {NodeServiceData} from './node-service-data';


/**
 * @author abdel-maliki
 * Date : 07/09/2020
 */

export abstract class AbstractNodeService<T extends AbstractEntity<T>> implements InterfaceService<T> {

  allEntities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  entities$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  pageElements$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  totalElement$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  error$: Subject<string> = new Subject<string>();
  pageSubscrption: Subscription;
  entity$: BehaviorSubject<T> = new BehaviorSubject<T>(null);
  errorMessage: string;
  readonly INVALID_PASSWORD_MESSAGE = 'Le mot de passe est incorrect';

  protected constructor(protected data: NodeServiceData) {
    data.translate.get(i18nConstantes.errorMessage).toPromise().then(value => this.errorMessage = value);
  }

  get baseOption(): HeadersOptions {
    return HttpHelpers.getOptions();
  }

  resolverFormJob(route: ActivatedRouteSnapshot, id: string = 'id'): Promise<ResponseWrapper<T>> {
    this.entity$.next(null);
    if (route.params && route.params[id] && route.params[id].length > 7) {
      return this.get(route.params[id]);
    } else {
      return null;
    }
  }

  mapQuery<R>(query: Observable<ResponseWrapper<R>>): Promise<ResponseWrapper<R>> {
    return query.pipe(map((value: ResponseWrapper<R>) => HttpHelpers.map<R>(value))).toPromise();
  }

  abstract getPath(): string;

  get(id: number| string, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery<T>(this.data.httpClient.put<ResponseWrapper<T>>(this.getUrl(`read/${id}`), JSON.stringify(others), this.baseOption))
        .then((value: ResponseWrapper<T>) => {
          this.entity$.next(value.data);
          resolve(value);
        })
        .catch((error: ResponseWrapper<T>) => {
          this.nextError(error, reject);
        });
    });
  }

  delete(id: number | string, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery<T>(this.data.httpClient.put<ResponseWrapper<T>>(this.getUrl(`delete/${id}`), JSON.stringify(others), this.baseOption))
        .then((value: any) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T>) => {
          this.nextError(error, reject);
        });
    });
  }

  create(entity: T, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<T>>(this.getUrl(),
        JSON.stringify({entity, others}), this.baseOption))
        .then((value: ResponseWrapper<T>) => {
          resolve(value);
        })
        .catch((error) => {
          this.nextError(error, reject);
        });
    });
  }

  update(entity: T, id: number | string, others?: any): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<T>>(this.getUrl(`update/${id}`),
        JSON.stringify({entity, others}), this.baseOption))
        .then((value: ResponseWrapper<T>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T>) => {
          this.nextError(error, reject);
        });
    });
  }

  pageElements(pagination: Pagination, others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<T[]>>(this.getUrl('page'),
        JSON.stringify({pagination, others}), this.baseOption))
        .then((response: ResponseWrapper<T[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  createAndGet(data: { entity: T; pagination: Pagination; }, others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<T[]>>(this.getUrl(`create/and-get`),
        JSON.stringify({entity: data.entity, pagination: data.pagination, others}), this.baseOption))
        .then((response: ResponseWrapper<T[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  updateAndGet(data: { entity: T; pagination: Pagination; }, id: string | number, others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<T[]>>(this.getUrl(`/update/and-get/${id}`),
        JSON.stringify({entity: data.entity, pagination: data.pagination, others}), this.baseOption))
        .then((response: ResponseWrapper<T[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAndGet(pagination: Pagination, id: string | number, others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<T[]>>(this.getUrl(`delete/and-get/${id}`)
        , JSON.stringify({pagination, others}), this.baseOption))
        .then((response: ResponseWrapper<T[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAllAndGet(entities: T[], pagination: Pagination, others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<T[]>>(this.getUrl('delete-all/and-get'),
        JSON.stringify({pagination, ids: entities.map(value => value.id), others}), this.baseOption))
        .then((response: ResponseWrapper<T[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  saveAll(entities: T[], others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<T[]>>(this.getUrl('save/all'),
        JSON.stringify({entities, others}), this.baseOption))
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  updateAll(entities: T[], others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.post<ResponseWrapper<T[]>>(this.getUrl('update/all'),
        JSON.stringify({entities, others}), this.baseOption))
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAll(entities: T[], others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.data.httpClient.put<ResponseWrapper<T[]>>(this.getUrl('delete/all'),
        JSON.stringify({ids: entities.map(value => value.id), others}), this.baseOption))
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  getAll(others?: any): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.data.httpClient.put<ResponseWrapper<T[]>>(this.getUrl('get/all'), JSON.stringify(others) , this.baseOption)
        .toPromise()
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  snapshot?(id: number, others?: any): Observable<ResponseWrapper<T>> {
    throw new Error('Method not implemented.');
  }

  snapshots?(others?: any): Observable<ResponseWrapper<T[]>> {
    throw new Error('Method not implemented.');
  }

  nextError<R>(responseWrapper: ResponseWrapper<R>, reject: (value?: ResponseWrapper<R>) => void): void {
    this.error$.next(responseWrapper && responseWrapper.error && responseWrapper.error.message
      ? responseWrapper.error.message
      : this.errorMessage);
    if (responseWrapper && responseWrapper.error && responseWrapper.error.message === this.INVALID_PASSWORD_MESSAGE) {
      this.data.passwordStateService.setStateToInvalid();
    }
    reject(responseWrapper);
  }

  getUrl(params?: string | number): string {
    if (params && typeof params === 'string' && params.startsWith('/')) {
      params = params.substring(0, params.length);
    }
    return environment.apiUrl + this.removeFirstSlash(this.getPath()) + (params ? `/${this.removeFirstSlash(params)}` : ``);
  }

  removeFirstSlash(params: string | number): string {
    return (params && typeof params === 'string' && params.length > 0 && params.startsWith('/'))
      ? params.substring(1, params.length)
      : `${params}`;
  }
}
