import {InterfaceService} from '../../../../common/interface/interface-service';
import {UserDomain} from '../domain/user-domain';
import {Pagination} from '../../../../common/class/pagination';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

export interface InterfaceUser extends InterfaceService<UserDomain> {

  activateAccount(pagination: Pagination, id: number | string, password: string): Promise<ResponseWrapper<UserDomain[]>>;

  disableAccount(pagination: Pagination, id: number | string, password: string): Promise<ResponseWrapper<UserDomain[]>>;

  activateAllAccount(entities: UserDomain[], pagination: Pagination, password: string): Promise<ResponseWrapper<UserDomain[]>>;

  disableAllAccount(entities: UserDomain[], pagination: Pagination, password: string): Promise<ResponseWrapper<UserDomain[]>>;

  resetPassword(id: string | number, password: string): Promise<ResponseWrapper<void>>;

  updateMyPassword(oldPassword: string, newPassword: string): Promise<ResponseWrapper<{ token: string }>>;



  allUsernames(): Promise<ResponseWrapper<string[]>>;

}
