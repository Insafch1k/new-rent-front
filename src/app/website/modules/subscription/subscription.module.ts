import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionRoutingModule } from './subscription.routing.module';
import { ObnovaModule } from '../obnova/obnova.module';



@NgModule({
  declarations: [
    SubscriptionComponent,
  ],
  imports: [
    CommonModule, SubscriptionRoutingModule, FormsModule, ReactiveFormsModule, ObnovaModule
  ]
})
export class SubscriptionModule{ }
