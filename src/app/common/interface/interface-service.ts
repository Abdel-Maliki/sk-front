import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ResponseWrapper} from '../class/response-wrapper';

/**
 * @author abdel-maliki
 * Date : 07/09/2020
 */


export interface InterfaceService<T>  {

  pageElements$: BehaviorSubject<T[]>;
  entites$: BehaviorSubject<T[]>;
  allEntities: BehaviorSubject<T[]>;
  totalElement$: BehaviorSubject<number>;
  error$: Observable<string>;
  pageSubscrption: Subscription;

  get(id: number): Observable<ResponseWrapper<T>> | Promise<ResponseWrapper<T>>;

  getAll(): Observable<ResponseWrapper<T[]>> | Promise<ResponseWrapper<T[]>>;

  pageElements(page: number, size: number, sort?: string): Promise<ResponseWrapper<T[]>>;

  create(entity: T): Promise<ResponseWrapper<T>>;

  update(entity: T, id: number | string): Promise<ResponseWrapper<T>>;

  saveAll?(entities: T[]): Observable<ResponseWrapper<T[]>> | Promise<ResponseWrapper<T[]>>;

  delete(id: number | string): Promise<ResponseWrapper<T>>;

  deleteAll?(entites: T[]): Promise<ResponseWrapper<T[]>>;

  getPath(): string;
}
