import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {ResponseWrapper} from '../class/response-wrapper';
import {Pagination} from '../class/pagination';
import {ActivatedRouteSnapshot} from '@angular/router';

/**
 * @author abdel-maliki
 * Date : 07/09/2020
 */


export interface InterfaceService<T> {

  pageElements$: BehaviorSubject<T[]>;
  entity$: BehaviorSubject<T>;
  entities$: BehaviorSubject<T[]>;
  allEntities: BehaviorSubject<T[]>;
  totalElement$: BehaviorSubject<number>;
  error$: Subject<string>;
  pageSubscrption: Subscription;
  INVALID_PASSWORD_MESSAGE: string;

  get(id: number): Promise<ResponseWrapper<T>>;

  getAll(...others): Promise<ResponseWrapper<T[]>>;

  pageElements(pagination: Pagination, ...others): Promise<ResponseWrapper<T[]>>;

  create(entity: T, ...others): Promise<ResponseWrapper<T>>;

  update(entity: T, id: number | string, ...others): Promise<ResponseWrapper<T>>;

  delete(id: number | string, ...data: any): Promise<ResponseWrapper<T>>;

  createAndGet(data: { entity: T, pagination: Pagination }, ...others): Promise<ResponseWrapper<T[]>>;

  updateAndGet(data: { entity: T, pagination: Pagination }, id: number | string, ...others): Promise<ResponseWrapper<T[]>>;

  deleteAndGet(pagination: Pagination, id: number | string, ...others): Promise<ResponseWrapper<T[]>>;

  deleteAllAndGet?(entities: T[], pagination: Pagination, ...others): Promise<ResponseWrapper<T[]>>;

  resolverFormJob(route: ActivatedRouteSnapshot, id?: string, ...others): Promise<ResponseWrapper<T>>;

  search?(...param: any): Promise<ResponseWrapper<T[]>>;

  saveAll?(entities: T[], ...others): Promise<ResponseWrapper<T[]>>;

  updateAll?(entities: T[], ...others): Promise<ResponseWrapper<T[]>>;

  deleteAll?(entities: T[], ...others): Promise<ResponseWrapper<T[]>>;

  snapshot?(id: number, ...others): Observable<ResponseWrapper<T>>;

  snapshots?(...others): Observable<ResponseWrapper<T[]>>;

  getPath(): string;
}
