import {InterfaceService} from '../../../../common/interface/interface-service';
import {UserDomaine} from './user-domaine';
import {Pagination} from '../../../../common/class/pagination';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

export interface InterfaceUser extends InterfaceService<UserDomaine> {

  activateAccount(pagination: Pagination, id: number | string): Promise<ResponseWrapper<UserDomaine[]>>;

  disableAccount(pagination: Pagination, id: number | string): Promise<ResponseWrapper<UserDomaine[]>>;

  activateAllAccount(entities: UserDomaine[], pagination: Pagination): Promise<ResponseWrapper<UserDomaine[]>>;

  disableAllAccount(entities: UserDomaine[], pagination: Pagination): Promise<ResponseWrapper<UserDomaine[]>>;

  resetPassword(id: string | number): Promise<ResponseWrapper<void>>;

}
