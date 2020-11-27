import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/**
 * @author abdel-maliki
 * Date : 26/11/2020
 */

enum PasswordState {
  UNKNOWN = 'UNKNOWN',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

@Injectable({providedIn: 'root'})
export class PasswordStateService {

  private passwordState: BehaviorSubject<PasswordState> = new BehaviorSubject<PasswordState>(PasswordState.INVALID);

  constructor() {
  }

  get state(): PasswordState {
    return this.passwordState.value;
  }

  setStateToValid(): void {
    this.passwordState.next( PasswordState.VALID);
  }

  setStateToInvalid(): void {
    this.passwordState.next(PasswordState.INVALID);
  }

  setStateToUnknown(): void {
    this.passwordState.next(PasswordState.UNKNOWN);
  }

  get isValid(): boolean {
    return this.state === PasswordState.VALID;
  }

  get isInvalid(): boolean {
    return this.state === PasswordState.INVALID;
  }

  get isUnknown(): boolean {
    return this.state === PasswordState.UNKNOWN;
  }

  get isFullInvalid(): boolean {
    return this.isInvalid || this.isUnknown;
  }
}
