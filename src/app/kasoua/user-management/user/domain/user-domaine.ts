import {AbstractEntity} from '../../../../common/abstract/abstract-entity';
import {ProfileDomaine} from '../../profil/domain/profile-domaine';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

export class UserDomaine extends AbstractEntity<UserDomaine> {
  email: string;
  name: string;
  password: string;
  userName: string;
  profile: ProfileDomaine;

  constructor() {
    super();
  }
}

