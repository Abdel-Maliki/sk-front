import {InterfaceService} from '../interface/interface-service';
import {AbstractEntity} from './abstract-entity';
import {BehaviorSubject, Observable, Subject, Subscription, throwError} from 'rxjs';
import {ResponseWrapper} from '../class/response-wrapper';
import {Socket} from 'ngx-socket-io';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';


/**
 * @author abdel-maliki
 * Date : 07/09/2020
 */

export abstract class AbstractNodeService<T extends AbstractEntity<T>> implements InterfaceService<T> {
  allEntities: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  entites$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  pageElements$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  totalElement$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  error$: Subject<string>;
  pageSubscrption: Subscription;

  protected constructor(protected socket: Socket, protected httpClient: HttpClient) {
  }

  /*create(entity: T): Promise<ResponseWrapper<T>> {
    entity.id = this.generateId();
    return new Promise<ResponseWrapper<T>>((resolve) => {
      const values: T[] = this.pageElements$.value;
      values.push(entity);
      console.log('Class: AbstractNodeService, Function: , Line 23 , this.pageElements$.value: '
        , this.pageElements$.value);
      this.pageElements$.next(values);
      this.totalElement$.next(this.totalElement$.value + 1);
      resolve(new ResponseWrapper(entity));
    });
  }*/

  get baseOption(): any {
    // tslint:disable-next-line:variable-name
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return {headers: _headers};
  }

  get(id: number): Observable<ResponseWrapper<T>> | Promise<ResponseWrapper<T>> {
    return undefined;
  }

  getAll(): Observable<ResponseWrapper<T[]>> | Promise<ResponseWrapper<T[]>> {
    return undefined;
  }

  /*pageElements(page: number, size: number, sort?: string): Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>(resolve => {
      this.pageElements$.next([]);
      this.totalElement$.next(30);
      resolve(new ResponseWrapper([], 0, 20));
    });
  }*/

  abstract getPath(): string;

  saveAll(entities: T[]): Observable<ResponseWrapper<T[]>> | Promise<ResponseWrapper<T[]>> {
    return undefined;
  }

  update(entity: T, id: number | string): Promise<ResponseWrapper<T>> {
    return new Promise((resolve) => {
      this.httpClient.put<any>(encodeURI('http://localhost:5000/profile/profile/' + id), JSON.stringify(entity),
        this.baseOption).subscribe((value: any) => {
        resolve(new ResponseWrapper(value));
      }, (error: HttpErrorResponse) => {
        resolve(ResponseWrapper.ko(error.message, error.status));
      });
    });
  }

  delete(id: number | string): Promise<ResponseWrapper<T>> {
    console.log('Class: AbstractNodeService, Function: delete, Line 82 , id: '
    , id);
    return new Promise((resolve) => {
      this.httpClient.delete<any>(encodeURI('http://localhost:5000/profile/profile/' + id), this.baseOption)
        .pipe(catchError(this.handleError)).subscribe((value: any) => {
        console.log('Class: AbstractNodeService, Function: , Line 85 , value: '
        , value);
        resolve(new ResponseWrapper(value));
      }, error => {
        console.log('Class: AbstractNodeService, Function: , Line 88 , error: '
          , error);
        resolve(ResponseWrapper.ko(error));
      });
    });
  }

  deleteAll(entities: T[]): Promise<ResponseWrapper<T[]>> {
    const ids: any[] = entities.map(value => value.id);
    return new Promise<ResponseWrapper<T[]>>((resolve) => {
      this.pageElements$.next(this.pageElements$.value.filter(value => !ids.includes(value.id)));
      resolve(new ResponseWrapper(null));
    });
  }

  create(entity: T): Promise<ResponseWrapper<T>> {
    return new Promise((resolve) => {
      this.httpClient.post<any>(encodeURI('http://localhost:5000/profile/profile'), JSON.stringify(entity),
        this.baseOption).pipe(catchError(this.handleError)).subscribe((value: any) => {
        console.log('Class: AbstractNodeService, Function: , Line 105 , new ResponseWrapper(entity): '
          , new ResponseWrapper(entity));
        console.log('Class: AbstractNodeService, Function: , Line 107 , new ResponseWrapper(entity).isValid(): '
          , new ResponseWrapper(entity).isValid());
        resolve(new ResponseWrapper(entity));
      }, error => {
        resolve(ResponseWrapper.ko(error));
      });
    });
  }


  pageElements(page: number, size: number, sort?: string): Promise<ResponseWrapper<T[]>> {
    return new Promise<ResponseWrapper<T[]>>(resolve => {
      this.socket.emit('getData');
      this.pageSubscrption = this.socket.fromEvent<T[]>('change').subscribe((entities: T[]) => {
        this.pageElements$.next(entities);
        this.totalElement$.next(30);
        console.log('Class: AbstractNodeService, Function: , Line 138 , entities: '
          , entities);
        resolve(new ResponseWrapper(entities.map((entity: any) => {
          entity.id = entity._id;
          return entity;
        })));
      }, error => {
        resolve(new ResponseWrapper(null, page, this.totalElement$.value, 404, error));
        this.error$.next(error);
      });
    });
  }

  protected handleError(error): Observable<never> {
    return throwError(error);
  }
}
