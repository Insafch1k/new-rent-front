import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferallsComponent } from './referalls.component';
import { ReferallsRoutingModule } from './referrals-routing.module';
import { ObnovaModule } from "../obnova/obnova.module";




@NgModule({
  declarations: [
    ReferallsComponent
  ],
  imports: [
    CommonModule, ReferallsRoutingModule, FormsModule, ReactiveFormsModule,
    ObnovaModule
]
})
export class ReferallsModule{ }
