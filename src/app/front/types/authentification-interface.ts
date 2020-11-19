import {BehaviorSubject, Observable} from 'rxjs';
import {UserDomaine} from '../../kasoua/user-management/user/domain/user-domaine';

/**
 * @author abdel-maliki
 * Date : 07/10/2020
 */

export interface AuthentificationInterface {
  userValue: UserDomaine;
  token: string;
  user: Observable<UserDomaine>;
  roles: BehaviorSubject<string[]>;
  login(username, password): Observable<void>;
  loadCurrentUserDatas(): Observable<void>;
  logout(): void ;
}
