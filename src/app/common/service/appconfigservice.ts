import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AppConfig} from '../class/appconfig';

@Injectable({providedIn: 'root'})
export class AppConfigService {

    config: AppConfig = {
        theme: 'saga-blue',
        dark: false,
        inputStyle: 'outlined',
        ripple: true,
        toolbare: true,
        menuLeft: true,
    };

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: AppConfig): void {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig(): AppConfig {
        return this.config;
    }
}
