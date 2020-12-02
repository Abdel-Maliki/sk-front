import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractComponent} from '../../../../../common/abstract/abstract-component';
import {LogDomain} from '../../domain/log-domain';
import {InterfaceLog} from '../../service/interface-log';
import {LogProvider} from '../../service/log-provider';
import {UserProvider} from '../../../user/service/user-provider';
import {ServiceUtils} from '../../../../../common/service/service-utils.service';
import {i18nConstantes} from '../../../../../../constantes/i18n-constantes';
import * as DeviceDetector from 'device-detector-js';


@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.scss']
})
export class LogDisplayComponent extends AbstractComponent<LogDomain, InterfaceLog, LogProvider> implements OnInit, OnDestroy {

  @Input() visible = false;
  @Input() entity: LogDomain = this.getNewInstance();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter();
  device: DeviceDetector.DeviceDetectorResult;

  i18nConstantes = i18nConstantes;

  constructor(provider: LogProvider,
              protected userProvider: UserProvider,
              serviceUtils: ServiceUtils) {
    super(provider, serviceUtils, i18nConstantes.logBase);
  }

  ngOnInit(): void {
    super.ngOnInit();

  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getNewInstance(): LogDomain {
    return new LogDomain();
  }

  onShow(): void {
    const deviceDetector = new DeviceDetector();
    this.device = deviceDetector.parse(this.entity.userAgent);
    console.log(this.device);
  }

}
