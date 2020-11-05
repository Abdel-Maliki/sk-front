import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {i18nConstantes} from '../../../../environments/i18n-constantes';

@Component({
  selector: 'app-modal-button',
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent implements OnInit {

  @Input() modal = true;
  @Input() forUpdate: boolean;
  @Input() validateLabel: string;
  @Input() disabled: boolean;
  @Input() cancelLabel: string;
  @Output() validateEvent: EventEmitter<void> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter();

  constructor(public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  getValidateLabel(): string {
    return this.forUpdate ? i18nConstantes.update : i18nConstantes.add;
  }

  getCancelLabel(): string {
    return i18nConstantes.cancel;
  }
}
