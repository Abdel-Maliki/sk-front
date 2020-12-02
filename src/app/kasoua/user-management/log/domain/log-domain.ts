/**
 * @author abdel-maliki
 * Date : 27/11/2020
 */

import {AbstractEntity} from '../../../../common/abstract/abstract-entity';
import {PathHelpers} from '../../../../common/class/PathHelpers';
import {RouteConstantes} from '../../../../../constantes/route-constantes';

export enum LogState {SUCCESS = 'SUCCESS', USER_ERROR = 'USER_ERROR', SERVER_ERROR = 'SERVER_ERROR' }

export class LogDomain extends AbstractEntity<LogDomain> {
  static baseRoute: string = PathHelpers.join([RouteConstantes.USER_MANAGEMENT, RouteConstantes.LOG]);
  action?: string | null;
  elementId?: string | null;
  userName?: string | null;
  state?: LogState | null;
  url?: string | null;
  method?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  code?: number | null;
  time?: number | null;
  host?: string | null;
  errorMessage?: string | null;
  serverError?: string;
}
