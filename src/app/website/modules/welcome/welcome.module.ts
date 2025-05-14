import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeRoutingModule } from './welcome.routing.module';
import { WelcomeComponent } from './welcome.component';



@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule, WelcomeRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class WelcomeModule{ }
