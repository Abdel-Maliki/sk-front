import {AbstractEntity} from '../../../../common/abstract/abstract-entity';
import {ProfileDomaine} from '../../profil/domain/profile-domaine';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

export enum UserState {
  ACTIVE = 'ACTIVE',
  DESACTIVE = 'DESACTIVE',
  BLOQUE = 'BLOQUE',
}

export class UserDomaine extends AbstractEntity<UserDomaine> {
  email: string;
  name: string;
  password: string;
  userName: string;
  profile: ProfileDomaine;
  status: UserState = UserState.ACTIVE;
  activatedDate: Date;
  deactivatedDate: Date;
  blockedDate: Date;

  constructor() {
    super();
  }
}

