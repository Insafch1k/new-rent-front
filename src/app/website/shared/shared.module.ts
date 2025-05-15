import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';

import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  exports: [CommonModule, HeaderComponent],
})
export class SharedModule { }
