import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GiveComponent } from './give/give.component';
import { GiveRoutingModule } from './give-routing.module';





@NgModule({
  declarations: [
    GiveComponent
  ],
  imports: [
    CommonModule, GiveRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class GiveModule{ }
