/**
 * @author abdel-maliki
 * Date : 06/10/2020
 */
import {Profile} from './profile';
import {AbstractEntity} from '../../common/abstract/abstract-entity';

export class User extends AbstractEntity<User> {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  token: string;
  profile: Profile;
}
