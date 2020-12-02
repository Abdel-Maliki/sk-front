import {Injectable} from '@angular/core';
import {AbstractNodeService} from '../../../../common/abstract/abstract-node-service';
import {NodeServiceData} from '../../../../common/abstract/node-service-data';
import {LogDomain} from '../domain/log-domain';
import {InterfaceLog} from './interface-log';
import {ResponseWrapper} from '../../../../common/class/response-wrapper';
import {Pagination} from '../../../../common/class/pagination';

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
  deleteAll(entities: LogDomain[], others?: any): Promise<ResponseWrapper<LogDomain[]>> {
    return new Promise<ResponseWrapper<LogDomain[]>>((resolve, reject) => {
      super.deleteAll(entities, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  deleteAllAndGet(entities: LogDomain[], pagination: Pagination, others?: any): Promise<ResponseWrapper<LogDomain[]>> {
    return new Promise<ResponseWrapper<LogDomain[]>>((resolve, reject) => {
      super.deleteAllAndGet(entities, pagination, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  deleteAndGet(pagination: Pagination, id: string | number, others?: any): Promise<ResponseWrapper<LogDomain[]>> {
    return new Promise<ResponseWrapper<LogDomain[]>>((resolve, reject) => {
      super.deleteAndGet(pagination, id, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }

  delete(id: number | string, others?: any): Promise<ResponseWrapper<LogDomain>> {
    return new Promise<ResponseWrapper<LogDomain>>((resolve, reject) => {
      super.delete(id, others).then(value => {
        this.data.passwordStateService.setStateToValid();
        resolve(value);
      }, reason => reject(reason));
    });
  }
}

