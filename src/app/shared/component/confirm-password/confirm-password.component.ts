import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {i18nConstantes} from '../../../../constantes/i18n-constantes';
import {ServiceUtils} from '../../../common/service/service-utils.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  @Input() visible = false;
  @Input() header: string;
  @Input() validateButtonLabel: string;
  @Output() validateEvent: EventEmitter<string> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter();

  i18nConstantes = i18nConstantes;
  passwordControl: FormControl = new FormControl('');
  passwordMinLength = 5;


  constructor(public serviceUtils: ServiceUtils) {
  }

  ngOnInit(): void {
    this.passwordControl.valueChanges.subscribe(value => this.serviceUtils.userConfigurationService.password = value);
  }

  onValidate(): void {
    this.serviceUtils.userConfigurationService.password = this.passwordControl.value;
    this.validateEvent.emit(this.passwordControl.value);
  }

  onShow(): void {
    this.passwordControl.setValue(this.serviceUtils.userConfigurationService.password);
  }

  onHide(): void {
    this.cancelEvent.emit();
  }
}
