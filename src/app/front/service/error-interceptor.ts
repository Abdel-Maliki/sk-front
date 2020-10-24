import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenficationProvider} from '../classe/authenfication-provider';
import {ResponseWrapper} from '../../common/class/response-wrapper';

/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenficationProvider: AuthenficationProvider) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if ([401, 403].includes(err.status) && this.authenficationProvider.getEnvService().userValue) {
        this.authenficationProvider.getEnvService().logout();
      }
      return throwError(ResponseWrapper.ko<any>(err.error.error.message, err.error.code));
    }));
  }
}
