import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {ProfileDomaine} from '../domain/profile-domaine';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

@Injectable({providedIn: 'root'})
export class ProfilNodeService extends AbstractNodeService<ProfileDomaine> {
  protected constructor(protected socket: Socket, protected httpClient: HttpClient) {
    super(socket, httpClient);
  }

  getPath(): string {
    return 'profile';
  }
}
