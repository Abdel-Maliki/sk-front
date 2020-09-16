import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-button',
  templateUrl: './modal-button.component.html',
  styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent implements OnInit {

  @Input() forUpdate: boolean;
  @Input() validateLabel: string;
  @Input() disabled: boolean;
  @Input() cancelLabel: string;
  @Output() validateEvent: EventEmitter<void> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  getValidateLabel(): string {
    return this.validateLabel ? this.validateLabel : this.forUpdate ? 'Mettre à jour' : 'Ajouter';
  }

  getCancelLabel(): string {
    return this.cancelLabel ? this.cancelLabel : 'Annuler';
  }
}
