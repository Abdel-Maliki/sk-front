import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuLeftComponent} from './front/component/menu-left/menu-left.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {TopbarComponent} from './front/component/topbar/topbar.component';
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RippleModule} from 'primeng/ripple';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ProgressBarModule} from 'primeng/progressbar';
import {LoaderInterceptor} from './common/interceptor/loader-interceptor';
import { LoginComponent } from './front/component/login/login.component';
import {JwtInterceptor} from './front/service/jwt-interceptor';
import {ErrorInterceptor} from './front/service/error-interceptor';
import { LoaderComponent } from './front/component/loader/loader.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';

const socketIoConfig: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MenuLeftComponent,
    TopbarComponent,
    LoginComponent,
    LoaderComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        SocketIoModule.forRoot(socketIoConfig),
        ReactiveFormsModule,
        HttpClientModule,
        ToastModule,
        CalendarModule,
        TooltipModule,
        AutoCompleteModule,
        RippleModule,
        TranslateModule.forRoot({
            defaultLanguage: 'fr',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ProgressBarModule,
        ConfirmPopupModule
    ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
