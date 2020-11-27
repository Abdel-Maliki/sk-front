import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {NodeServiceData} from '../../../../common/abstract/node-service-data';
import {LogDomain} from '../domain/log-domain';
import {InterfaceLog} from './interface-log';

/**
 * @author abdel-maliki
 * Date : 27/11/2020
 */

@Injectable({providedIn: 'root'})
export class LogNodeService extends AbstractNodeService<LogDomain> implements InterfaceLog {
  protected constructor(data: NodeServiceData) {
    super(data);
  }

  getPath(): string {
    return 'logs';
  }
}

