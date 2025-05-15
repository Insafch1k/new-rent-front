import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakeComponent } from './take/take.component';
import { TakeRoutingModule } from './take-routing.module';
import { AdComponent } from './ad/ad.component';
import { AdBottomComponent } from './ad-bottom/ad-bottom.component';
import { AdMoreComponent } from './ad-more/ad-more.component';
import { AdMoreMainInfoComponent } from './ad-more-main-info/ad-more-main-info.component';
import { AdMoreBottomComponent } from './ad-more-bottom/ad-more-bottom.component';
import { ViborComponent } from './vibor/vibor.component';
import { TakeMoreComponent } from './take-more/take-more.component';




@NgModule({
  declarations: [
    TakeComponent,
    AdComponent,
    AdBottomComponent,
    AdMoreComponent,
    AdMoreMainInfoComponent,
    AdMoreBottomComponent,
    ViborComponent,
    TakeMoreComponent,
  ],
  imports: [
    CommonModule, TakeRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class TakeModule{ }
