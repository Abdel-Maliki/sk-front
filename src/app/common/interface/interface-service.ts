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

  get(id: number| string): Promise<ResponseWrapper<T>>;

  getAll(others?: any): Promise<ResponseWrapper<T[]>>;

  pageElements(pagination: Pagination, others?: any): Promise<ResponseWrapper<T[]>>;

  create(entity: T, others?: any): Promise<ResponseWrapper<T>>;

  update(entity: T, id: number | string, others?: any): Promise<ResponseWrapper<T>>;

  delete(id: number | string, ...data: any): Promise<ResponseWrapper<T>>;

  createAndGet(data: { entity: T, pagination: Pagination }, others?: any): Promise<ResponseWrapper<T[]>>;

  updateAndGet(data: { entity: T, pagination: Pagination }, id: number | string, others?: any): Promise<ResponseWrapper<T[]>>;

  deleteAndGet(pagination: Pagination, id: number | string, others?: any): Promise<ResponseWrapper<T[]>>;

  deleteAllAndGet?(entities: T[], pagination: Pagination, others?: any): Promise<ResponseWrapper<T[]>>;

  resolverFormJob(route: ActivatedRouteSnapshot, id?: string, others?: any): Promise<ResponseWrapper<T>>;

  saveAll?(entities: T[], others?: any): Promise<ResponseWrapper<T[]>>;

  updateAll?(entities: T[], others?: any): Promise<ResponseWrapper<T[]>>;

  deleteAll?(entities: T[], others?: any): Promise<ResponseWrapper<T[]>>;

  snapshot?(id: number, others?: any): Observable<ResponseWrapper<T>>;

  snapshots?(others?: any): Observable<ResponseWrapper<T[]>>;

  getPath(): string;
}
