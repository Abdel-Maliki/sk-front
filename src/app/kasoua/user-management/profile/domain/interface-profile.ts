import {InterfaceService} from '../../../../common/interface/interface-service';
import {ProfileDomaine} from './profile-domaine';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

export interface InterfaceProfile extends InterfaceService<ProfileDomaine> {
  getRoles(id: number | string): Promise<string[]>;

  setRoles(id: number | string, roles: string[], password: string): Promise<void>;
}

