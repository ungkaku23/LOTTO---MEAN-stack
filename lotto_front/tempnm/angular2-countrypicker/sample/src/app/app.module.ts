import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { CountryPickerModule } from 'angular2-countrypicker';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    CountryPickerModule.forRoot(),
    // CountryPickerModule.forRoot({
    //   baseUrl: 'assets/'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
