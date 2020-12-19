import {InterfaceService} from '../interface/interface-service';
import {AbstractEntity} from './abstract-entity';
import {UserConfigurationService} from '../service/user-configuration.service';
import {ConfigurationService} from '../service/configuration-service';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {AbstractNodeService} from './abstract-node-service';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

export abstract class AbstractServiceProvider<T extends AbstractEntity<T>, R extends InterfaceService<T>> {

  protected constructor(private nodeService: R) {
  }

  getEnvService(): R {
    return this.nodeService;
  }
}
