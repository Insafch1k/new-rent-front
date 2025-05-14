import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GiveComponent } from './give/give.component';
import { GiveRoutingModule } from './give-routing.module';
import { VerificationComponent } from './verification/verification/verification.component';
import { ConsiderationComponent } from './verification/consideration/consideration.component';
import { AcceptedComponent } from './verification/accepted/accepted.component';
import { RejectedComponent } from './verification/rejected/rejected.component';






@NgModule({
  declarations: [
    GiveComponent,
    VerificationComponent,
    ConsiderationComponent,
    AcceptedComponent,
    RejectedComponent,
  ],
  imports: [
    CommonModule, GiveRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class GiveModule{ }
