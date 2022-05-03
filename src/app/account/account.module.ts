import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { PipesModule } from '../Core/_pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { RecentchartsComponent } from './recentcharts/recentcharts.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    LoginComponent,
    RecentchartsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    PipesModule,
    NgxMaskModule.forRoot(),
    InfiniteScrollModule
  ]
})
export class AccountModule { }
