import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../service/user';

/**
 * @author abdel-maliki
 * Date : 07/10/2020
 */

export interface AuthentificationInterface {
  userValue: User;
  user: Observable<User>;
  login(username, password): Observable<User>;
  logout(): void ;
}
