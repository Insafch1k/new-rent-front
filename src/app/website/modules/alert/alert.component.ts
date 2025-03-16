import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  alerts = [
    {
      title: 'Новая квартира!',
      date: 'Сегодня',
      description: 'Посмоторите последнюю опубликованную квартиру раньше других. Посмоторите последнюю опубликованную квартиру раньше других. Посмоторите последнюю опубликованную квартиру раньше других.'
    },
    {
      title: 'Продлите подписку!',
      date: 'Вчера',
      description: 'Ваш уровень подписки “Лайт” подходит к концу. Вы можете настроить автопродление подписки.'
    }
  ];
}
