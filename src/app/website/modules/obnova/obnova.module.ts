import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObnovaComponent } from './obnova.component';
import { ObnovaRoutingModule } from './obnova-routing.module';




@NgModule({
  declarations: [
    ObnovaComponent
  ],
  imports: [
    CommonModule, ObnovaRoutingModule, FormsModule, ReactiveFormsModule
  ],
   exports: [ObnovaComponent] 
})
export class ObnovaModule{ }
