import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PasswordStateService} from './password-state-service';

/**
 * @author abdel-maliki
 * Date : 08/09/2020
 */

@Injectable({providedIn: 'root'})
export class UserConfigurationService {

  passwordDate = new Date();
  passwordValidTime = 250000;

  private passwordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(public passwordStateService: PasswordStateService) {
  }

  get password(): string {
    return this.passwordMarge();
  }

  private passwordMarge(milliseconds: number = 0): string {
    if (new Date().getTime() + milliseconds > this.passwordDate.getTime() + this.passwordValidTime) {
      this.passwordSubject.next('');
    }
    return this.passwordSubject.value;
  }

  set password(password: string) {
    this.passwordDate = new Date();
    this.passwordSubject.next(password);
    this.passwordStateService.setStateToUnknown();
  }

  get isValidPassword(): boolean {
    const password = this.passwordMarge(15);
    return this.passwordStateService.isValid && password && password.length > 0;
  }
}
