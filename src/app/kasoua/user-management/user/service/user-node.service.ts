import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {HttpClient} from '@angular/common/http';
import {UserDomaine} from '../domain/user-domaine';
import {InterfaceUser} from '../domain/interface-user';

/**
 * @author abdel-maliki
 * Date : 25/10/2020
 */

@Injectable({providedIn: 'root'})
export class UserNodeService extends AbstractNodeService<UserDomaine> implements InterfaceUser {
  protected constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getPath(): string {
    return 'users';
  }
}

