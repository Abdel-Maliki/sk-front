/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */
import {constantes} from '../../../environments/constantes';

export class ResponseWrapper<T> {

  constructor(public data?: T ,
              public page?: number,
              public size = constantes.defaultPageSize,
              public totalElements = 0,
              public status = 200,
              public error?: string) {
  }

  static ko<T>(error: string, status = 400): ResponseWrapper<T>{
    return new ResponseWrapper<T>(null, null, null, null, status, error);
  }
  isValid(): boolean{
    return this.status &&  this.status >= 200 &&  this.status < 400;
  }

  isNotValid(): boolean{
    return !this.isValid();
  }
}
