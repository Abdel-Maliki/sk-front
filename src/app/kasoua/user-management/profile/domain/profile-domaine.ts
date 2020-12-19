import {AbstractEntity} from '../../../../common/abstract/abstract-entity';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {RouteConstantes} from '../../../../../constantes/route-constantes';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

export class ProfileDomaine extends AbstractEntity<ProfileDomaine> {

  constructor(public name?: string, public description?: string) {
    super();
  }

  static baseRoute: string = PathHelpers.join([RouteConstantes.USER_MANAGEMENT, RouteConstantes.PROFIL]);

}
