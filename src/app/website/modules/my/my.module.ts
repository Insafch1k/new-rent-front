import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyComponent } from './my/my.component';
import { MyRoutingModule } from './my-routing.module';




@NgModule({
  declarations: [
    MyComponent
  ],
  imports: [
    CommonModule, MyRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class MyModule{ }
