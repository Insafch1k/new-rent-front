import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { FreethComponent } from './freeth/freeth.component';

@NgModule({
    declarations: [
        MainComponent,
        FirstComponent,
        SecondComponent,
        FreethComponent,
    ],
    imports: [CommonModule,MainRoutingModule, ReactiveFormsModule],
})
export class MainModule {}
