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
      if ([401].includes(err.status)) {
        this.authenficationProvider.getEnvService().logout();
      }else if ([403].includes(err.status)) {
        this.authenficationProvider.getEnvService().userSubject.next(err.error.data.user);
        this.authenficationProvider.getEnvService().rolesSubject.next(err.error.data.roles);
      }
      return throwError(ResponseWrapper.ko<any>(err.error.error.message, err.error.code));
    }));
  }
}
