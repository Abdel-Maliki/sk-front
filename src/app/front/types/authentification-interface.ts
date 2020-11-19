import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../service/user';

/**
 * @author abdel-maliki
 * Date : 07/10/2020
 */

export interface AuthentificationInterface {
  userValue: User;
  token: string;
  user: Observable<User>;
  roles: BehaviorSubject<string[]>;
  login(username, password): Observable<void>;
  loadCurrentUserDatas(): Observable<void>;
  logout(): void ;
}
