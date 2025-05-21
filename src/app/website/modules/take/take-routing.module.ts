import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeComponent } from './take/take.component';
import { AdComponent } from './ad/ad.component';
import { AdMoreComponent } from './ad-more/ad-more.component';
import { ViborComponent } from './vibor/vibor.component';
import { TakeMoreComponent } from './take-more/take-more.component';

const routes: Routes = [
  {
    path: '',
    component: ViborComponent,
    data: { title: 'Вариант съема', animation: 'ViborPage' }
  },
  {
    path: 'take',
    component: TakeComponent,
    data: { title: 'Снять квартиру', animation: 'TakePage' }
  },
  {
    path: 'ad',
    component: AdComponent,
    data: { title: 'Снять квартиру', animation: 'AdPage' }
  },
  {
    path: 'ad-more',
    component: AdMoreComponent,
    data: { title: 'Подробнее', animation: 'AdMorePage' }
  },
  {
    path: 'redactor',
    component: TakeMoreComponent,
    data: { title: 'Редактирование', animation: 'TakeMorePage' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeRoutingModule {}