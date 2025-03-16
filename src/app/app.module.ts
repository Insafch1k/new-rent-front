import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainModule } from './website/main/main.module';
import { SharedModule } from './website/shared/shared.module';
import { ProfileComponent } from './website/modules/profile/profile.component';
import { AlertComponent } from './website/modules/alert/alert.component';
import { SubscriptionComponent } from './website/modules/subscription/subscription.component';
import { ReferallsComponent } from './website/modules/referalls/referalls.component';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
