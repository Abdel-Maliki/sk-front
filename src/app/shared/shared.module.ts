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
import {ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {ModalButtonComponent} from './component/modal-button/modal-button.component';
import {TranslateModule} from '@ngx-translate/core';
import {Riqueredpipe} from '../common/pipe/RiqueredPipe';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [ModalButtonComponent, Riqueredpipe],
  imports: [
    ButtonModule,
    CommonModule,
    TranslateModule
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
  ]
})
export class SharedModule {
}
