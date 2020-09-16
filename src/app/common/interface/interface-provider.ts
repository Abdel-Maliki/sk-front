import {InterfaceService} from './interface-service';
import {AbstractEntity} from '../abstract/abstract-entity';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

export interface InterfaceProvider<T extends AbstractEntity<T>, R extends InterfaceService<T>> {
  nodeService: R;
  javaService: R;
  fireBaseService: R;

  getEnvService(): R;
}
