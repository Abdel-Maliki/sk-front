import {Injectable} from '@angular/core';
import {AbstractServiceProvider} from '../../../../common/abstract/abstract-service-provider';
import {LogDomain} from '../domain/log-domain';
import {InterfaceLog} from './interface-log';
import {LogNodeService} from './log-node-service';

/**
 * @author abdel-maliki
 * Date : 27/11/2020
 */

@Injectable({providedIn: 'root'})
export class LogProvider extends AbstractServiceProvider<LogDomain, InterfaceLog> {
  constructor(logNodeService: LogNodeService) {
    super(logNodeService);
  }
}
