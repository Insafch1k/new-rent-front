import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert.component';
import { AlertRoutingModule } from './alert-routing.module';




@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule, AlertRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class AlertModule{ }
