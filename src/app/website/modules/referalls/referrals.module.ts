import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferallsComponent } from './referalls.component';
import { ReferallsRoutingModule } from './referrals-routing.module';




@NgModule({
  declarations: [
    ReferallsComponent
  ],
  imports: [
    CommonModule, ReferallsRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class ReferallsModule{ }
