import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { PipesModule } from './Core/_pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from "ngx-toast-notifications";
const config: SocketIoConfig = { url: 'https://devapiex.axelautomotive.com', options: {} }; //dev
// const config: SocketIoConfig = { url: 'https://xchangeapi.axelautomotive.com', options: {} }; //prod
//const config: SocketIoConfig = { url: 'https://xchangeaxelapi.axelautomotive.com', options: {} }; //axel

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    PipesModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastNotificationsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
