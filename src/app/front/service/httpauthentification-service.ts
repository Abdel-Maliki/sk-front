import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthentificationInterface} from '../types/authentification-interface';
import {ResponseWrapper} from '../../common/class/response-wrapper';
import {HeadersOptions, HttpHelpers} from '../../common/class/http-helpers';
import {constantes} from '../../../constantes/constantes';
import {UserDomain} from '../../kasoua/user-management/user/domain/user-domain';

/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */

@Injectable({providedIn: 'root'})
export class HttpauthentificationService implements AuthentificationInterface {
  userSubject: BehaviorSubject<UserDomain> = new BehaviorSubject<UserDomain>(null);
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(JSON.parse(localStorage.getItem(constantes.storageToken)));
  user: Observable<UserDomain>;
  rolesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.user = this.userSubject.asObservable();
  }

  get baseOption(): HeadersOptions {
    return HttpHelpers.getOptions();
  }

  public get userValue(): UserDomain {
    return this.userSubject.value;
  }

  public get token(): string {
    return this.tokenSubject.value;
  }

  login(email, password): Observable<void> {
    return this.http.post<ResponseWrapper<{ token: string }>>(`${environment.apiUrl}login`, {email, password})
      .pipe(map((response: ResponseWrapper<{ token: string }>) => {
        localStorage.setItem(constantes.storageToken, JSON.stringify(response.data.token));
        this.tokenSubject.next(response.data.token);
        return;
      }));
  }

  loadCurrentUserDatas(): Observable<void> {
    return this.http.get<ResponseWrapper<{ user: UserDomain, roles: string[] }>>
    (`${environment.apiUrl}users/current-user-data`, this.baseOption)
      .pipe(map((value: ResponseWrapper<{ user: UserDomain, roles: string[] }>) => {
        this.rolesSubject.next(value.data.roles);
        this.userSubject.next(value.data.user);
      }));
  }

  logout(): void {
    localStorage.removeItem(constantes.storageToken);
    this.userSubject.next(null);
    this.router.navigate(['/login']).then();
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.error as ResponseWrapper<any>);
  }
}
