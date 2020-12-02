import {NgModule} from '@angular/core';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RatingModule} from 'primeng/rating';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {ModalButtonComponent} from './component/modal-button/modal-button.component';
import {TranslateModule} from '@ngx-translate/core';
import {Riqueredpipe} from '../common/pipe/RiqueredPipe';
import {CommonModule} from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmPasswordComponent} from './component/confirm-password/confirm-password.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';



@NgModule({
  declarations: [ModalButtonComponent, Riqueredpipe, ConfirmPasswordComponent],
  imports: [
    CommonModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    ConfirmDialogModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ProgressBarModule,
    TooltipModule,
    RadioButtonModule,
    ToolbarModule,
    FileUploadModule,
    TabViewModule,
    RatingModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    MenuModule,
    TranslateModule,
    PanelMenuModule,
    CheckboxModule,
    ConfirmPopupModule,
  ],

  exports: [
    CalendarModule,
    SliderModule,
    DialogModule,
    ConfirmDialogModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ProgressBarModule,
    TooltipModule,
    RadioButtonModule,
    ToolbarModule,
    FileUploadModule,
    TabViewModule,
    RatingModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    MenuModule,
    ModalButtonComponent,
    TranslateModule,
    Riqueredpipe,
    PanelMenuModule,
    CheckboxModule,
    ConfirmPasswordComponent,
    ConfirmPopupModule,
    FormsModule,
    TriStateCheckboxModule,
  ]
})
export class SharedModule {
}
