import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthProvider} from '../classe/authentification-provider.service';


/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authProvider: AuthProvider) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authProvider.getEnvService().token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (token && token.trim().length > 0 && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
