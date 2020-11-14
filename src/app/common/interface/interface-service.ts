import {BehaviorSubject, Observable, Subscription} from 'rxjs';
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
  error$: BehaviorSubject<string>;
  pageSubscrption: Subscription;

  get(id: number): Promise<ResponseWrapper<T>>;

  getAll(): Promise<ResponseWrapper<T[]>>;

  pageElements(pagination: Pagination): Promise<ResponseWrapper<T[]>>;

  create(entity: T): Promise<ResponseWrapper<T>>;

  update(entity: T, id: number | string): Promise<ResponseWrapper<T>>;

  delete(id: number | string): Promise<ResponseWrapper<T>>;

  createAndGet(data: { entity: T, pagination: Pagination }): Promise<ResponseWrapper<T[]>>;

  updateAndGet(data: { entity: T, pagination: Pagination }, id: number | string): Promise<ResponseWrapper<T[]>>;

  deleteAndGet(pagination: Pagination, id: number | string): Promise<ResponseWrapper<T[]>>;

  deleteAllAndGet?(entities: T[], pagination: Pagination): Promise<ResponseWrapper<T[]>>;

  resolverFormJob(route: ActivatedRouteSnapshot, id?: string): Promise<ResponseWrapper<T>>;

  search?(...param: any): Promise<ResponseWrapper<T[]>>;

  saveAll?(entities: T[]): Promise<ResponseWrapper<T[]>>;

  updateAll?(entities: T[]): Promise<ResponseWrapper<T[]>>;

  deleteAll?(entities: T[]): Promise<ResponseWrapper<T[]>>;

  snapshot?(id: number): Observable<ResponseWrapper<T>>;

  snapshots?(): Observable<ResponseWrapper<T[]>>;

  getPath(): string;
}
