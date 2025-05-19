import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeComponent } from './take/take.component';
import { AdComponent } from './ad/ad.component';
import { AdMoreComponent } from './ad-more/ad-more.component';
import { ViborComponent } from './vibor/vibor.component';
import { TakeMoreComponent } from './take-more/take-more.component';

const routes: Routes = [
  {
    data: { title: 'Вариант съема' },
    path: '',
    component: ViborComponent,
  },
  {
    data: { title: 'Снять квартиру' },
    path: 'take',
    component: TakeComponent,
  },
  {
    data: { title: 'Снять квартиру' },
    path: 'ad',
    component: AdComponent,
  },
  {
    data: { title: 'Подробнее' },
    path: 'ad-more',
    component: AdMoreComponent,
  },
  {
    data: { title: 'Редактирование' },
    path: 'redactor',
    component: TakeMoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeRoutingModule {}