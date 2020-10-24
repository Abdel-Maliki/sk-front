/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */
import {Pagination} from './pagination';

export class ResponseWrapper<T> {

  constructor(public data?: T ,
              public pagination?: Pagination,
              public code = 200,
              public error?: {message: string}) {
  }

  static ko<T>(message: string, status = 400): ResponseWrapper<T>{
    return new ResponseWrapper<T>(null, null, status, {message});
  }

  static ok<T>(message: string, status = 400): ResponseWrapper<T>{
    return new ResponseWrapper<T>(null, null, status, {message});
  }
  isValid(): boolean{
    return this.code &&  this.code >= 200 &&  this.code < 400;
  }

  isNotValid(): boolean{
    return !this.isValid();
  }
}
