import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyHistoryComponent } from './my-history.component';
import { MyHistoryRoutingModule } from './my-history-routing.module';





@NgModule({
  declarations: [
    MyHistoryComponent
  ],
  imports: [
    CommonModule, MyHistoryRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class MyHistoryModule{ }
