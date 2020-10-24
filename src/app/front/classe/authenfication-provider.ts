/**
 * @author abdel-maliki
 * Date : 07/10/2020
 */
import {Injectable} from '@angular/core';
import {HttpauthentificationService} from '../service/httpauthentification-service';
import {AuthentificationInterface} from '../types/authentification-interface';

@Injectable({providedIn: 'root'})
export class AuthenficationProvider {
  constructor(private httpauthentificationService: HttpauthentificationService) {
  }

  getEnvService(): AuthentificationInterface{
    return this.httpauthentificationService;
  }
}
