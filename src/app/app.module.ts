import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './website/main/main.module';
import { SharedModule } from './website/shared/shared.module';
import { ProfileComponent } from './website/modules/profile/profile.component';
import { AlertComponent } from './website/modules/alert/alert.component';
import { SubscriptionComponent } from './website/modules/subscription/subscription.component';
import { ReferallsComponent } from './website/modules/referalls/referalls.component';
import { WelcomeComponent } from './website/modules/welcome/welcome.component';
import { LoadingInterceptor } from './website/shared/loading.interceptor';
import { LoadingSpinnerComponent } from './website/shared/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    MainModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
