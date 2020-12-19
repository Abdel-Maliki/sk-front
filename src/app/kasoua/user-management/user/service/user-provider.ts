import {AbstractServiceProvider} from '../../../../common/abstract/abstract-service-provider';
import {Injectable} from '@angular/core';
import {UserDomain} from '../domain/user-domain';
import {InterfaceUser} from './interface-user';
import {UserNodeService} from './user-node.service';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

@Injectable({providedIn: 'root'})
export class UserProvider extends AbstractServiceProvider<UserDomain, InterfaceUser> {
  constructor(userNodeService: UserNodeService) {
    super(userNodeService);
  }
}
