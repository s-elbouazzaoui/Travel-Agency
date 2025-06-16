import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {ToastrModule} from 'ngx-toastr';
import {provideHttpClient} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';

bootstrapApplication(AppComponent, {
  providers: [

    provideRouter(routes),
    provideHttpClient(),
    // register the BrowserAnimationsModule (required by many ngx-bootstrap components)
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      ModalModule.forRoot()        ),

    // register FormsModule so [(ngModel)] works
    importProvidersFrom(FormsModule),

    // register the datepicker module and its services
    importProvidersFrom(BsDatepickerModule.forRoot()),

    importProvidersFrom(
      ToastrModule.forRoot()
    ),
  ]
})
  .catch((err) => console.error(err));
