import {AbstractEntity} from '../../../../common/abstract/abstract-entity';
import {ProfileDomaine} from '../../profil/domain/profile-domaine';
import {RouteConstantes} from '../../../../../constantes/route-constantes';
import {PathHelpers} from '../../../../common/class/PathHelpers';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

export enum UserState {
  ACTIVE = 'ACTIVE',
  DESACTIVE = 'DESACTIVE',
  BLOQUE = 'BLOQUE',
}

export class UserDomain extends AbstractEntity<UserDomain> {
  constructor() {
    super();
  }

  static baseRoute: string = PathHelpers.join([RouteConstantes.USER_MANAGEMENT, RouteConstantes.USER]);
  email: string;
  name: string;
  password: string;
  userName: string;
  profile: ProfileDomaine;
  status: UserState = UserState.ACTIVE;
  activatedDate: Date;
  deactivatedDate: Date;
  blockedDate: Date;
}

