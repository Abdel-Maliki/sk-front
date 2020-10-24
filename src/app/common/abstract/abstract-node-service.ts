import {InterfaceService} from '../interface/interface-service';
import {AbstractEntity} from './abstract-entity';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ResponseWrapper} from '../class/response-wrapper';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HeadersOptions, HttpHelpers} from '../class/http-helpers';
import {map} from 'rxjs/operators';
import {Pagination} from '../class/pagination';


/**
 * @author abdel-maliki
 * Date : 07/09/2020
 */

export abstract class AbstractNodeService<T extends AbstractEntity<T>> implements InterfaceService<T> {
  allEntities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  entites$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  pageElements$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  totalElement$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  error$: BehaviorSubject<string> = new BehaviorSubject(null);
  pageSubscrption: Subscription;


  protected constructor(protected socket: Socket, protected httpClient: HttpClient) {
  }

  get baseOption(): HeadersOptions {
    return HttpHelpers.getOptions();
  }

  mapQuery<R>(query: Observable<ResponseWrapper<R>>): Promise<ResponseWrapper<R>> {
    return query.pipe(map((value: ResponseWrapper<R>) => HttpHelpers.map<R>(value))).toPromise();
  }

  abstract getPath(): string;

  get(id: number): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery<T>(this.httpClient.get<ResponseWrapper<T>>(this.getUrl(id), this.baseOption))
        .then((value: ResponseWrapper<T>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T>) => {
          this.nextError(error, reject);
        });
    });
  }

  delete(id: number | string): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery<T>(this.httpClient.delete<ResponseWrapper<T>>(this.getUrl(id), this.baseOption))
        .then((value: any) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T>) => {
          this.nextError(error, reject);
        });
    });
  }

  create(entity: T): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.post<ResponseWrapper<T>>(this.getUrl(), JSON.stringify(entity), this.baseOption))
        .then((value: ResponseWrapper<T>) => {
          resolve(value);
        })
        .catch((error) => {
          console.log('Class: AbstractNodeService, Function: , Line 70 , error: '
            , error);
          this.nextError(error, reject);
        });
    });
  }

  update(entity: T, id: number | string): Promise<ResponseWrapper<T>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<T>>(this.getUrl(id), JSON.stringify(entity), this.baseOption))
        .then((value: ResponseWrapper<T>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T>) => {
          this.nextError(error, reject);
        });
    });
  }

  pageElements(pagination: Pagination): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.post<ResponseWrapper<T[]>>(this.getUrl('page'), pagination, this.baseOption))
        .then((response: ResponseWrapper<T[]>) => {
          this.pageElements$.next(response.data);
          this.totalElement$.next(response.pagination.totalElements);
          resolve(response);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          console.log('Class: AbstractNodeService, Function: , Line 99 , error: '
          , error);
          this.nextError(error, reject);
        });
    });
  }

  createAndGet(data: { entity: T; pagination: Pagination; }): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.post<ResponseWrapper<T[]>>(this.getUrl(`create/and-get`),
        JSON.stringify(data), this.baseOption))
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

  updateAndGet(data: { entity: T; pagination: Pagination; }, id: string | number): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<T[]>>(this.getUrl(`/update/and-get/${id}`),
        JSON.stringify(data), this.baseOption))
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

  deleteAndGet(pagination: Pagination, id: string | number): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<T[]>>(this.getUrl(`delete/and-get/${id}`)
        , JSON.stringify(pagination), this.baseOption))
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

  saveAll(entities: T[]): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.post<ResponseWrapper<T[]>>(this.getUrl('save/all'), JSON.stringify(entities), this.baseOption))
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  updateAll(entities: T[]): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.post<ResponseWrapper<T[]>>(this.getUrl('update/all'), JSON.stringify(entities), this.baseOption))
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  deleteAll(entities: T[]): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.mapQuery(this.httpClient.put<ResponseWrapper<T[]>>(this.getUrl('delete/all'),
        JSON.stringify(entities.map(value => value.id)), this.baseOption))
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  getAll(): Promise<ResponseWrapper<T[]>> {
    return new Promise((resolve, reject) => {
      this.httpClient.get<ResponseWrapper<T[]>>(this.getUrl('get/all'), this.baseOption)
        .toPromise()
        .then((value: ResponseWrapper<T[]>) => {
          resolve(value);
        })
        .catch((error: ResponseWrapper<T[]>) => {
          this.nextError(error, reject);
        });
    });
  }

  snapshot?(id: number): Observable<ResponseWrapper<T>> {
    throw new Error('Method not implemented.');
  }

  snapshots?(): Observable<ResponseWrapper<T[]>> {
    throw new Error('Method not implemented.');
  }

  nextError<R>(responseWrapper: ResponseWrapper<R>, reject: (value?: ResponseWrapper<R>) => void): void {
    this.error$.next(responseWrapper && responseWrapper.error && responseWrapper.error.message ? responseWrapper.error.message : 'lll');
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
