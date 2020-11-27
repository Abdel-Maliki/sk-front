import {BehaviorSubject, Observable} from 'rxjs';
import {UserDomain} from '../../kasoua/user-management/user/domain/user-domain';

/**
 * @author abdel-maliki
 * Date : 07/10/2020
 */

export interface AuthentificationInterface {
  userValue: UserDomain;
  userSubject: BehaviorSubject<UserDomain>;
  tokenSubject: BehaviorSubject<string>;
  token: string;
  user: Observable<UserDomain>;
  rolesSubject: BehaviorSubject<string[]>;
  login(username, password): Observable<void>;
  loadCurrentUserDatas(): Observable<void>;
  logout(): void ;
}
