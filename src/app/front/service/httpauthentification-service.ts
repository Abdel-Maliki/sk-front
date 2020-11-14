import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from './user';
import {environment} from '../../../environments/environment';
import {AuthentificationInterface} from '../types/authentification-interface';
import {ResponseWrapper} from '../../common/class/response-wrapper';
import {HeadersOptions, HttpHelpers} from '../../common/class/http-helpers';

/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */

@Injectable({providedIn: 'root'})
export class HttpauthentificationService implements AuthentificationInterface {
  userSubject: BehaviorSubject<User>;
  user: Observable<User>;
  roles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  get baseOption(): HeadersOptions {
    return HttpHelpers.getOptions();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email, password): Observable<User> {
    return this.http.post<ResponseWrapper<{ user: User, token: string }>>(`${environment.apiUrl}login`, {email, password})
      .pipe(map((response: ResponseWrapper<{ user: User, token: string }>) => {
        response.data.user.token = response.data.token;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.userSubject.next(response.data.user);
        return response.data.user;
      }), catchError(this.handleError));
  }

  currentUserRoles(): Observable<string[]> {
    return this.http.get<ResponseWrapper<string[]>>(`${environment.apiUrl}users/current-user-roles`, this.baseOption)
      .pipe(map((value: ResponseWrapper<string[]>) => {
        this.roles.next(value.data);
        return value.data;
      }));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']).then();
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.error as ResponseWrapper<any>);
  }
}
