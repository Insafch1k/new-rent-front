import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-ad-more-main-info',
  templateUrl: './ad-more-main-info.component.html',
  styleUrls: ['./ad-more-main-info.component.scss']
})
export class AdMoreMainInfoComponent implements AfterViewInit {
  @ViewChildren('plashka') plashkaElements!: QueryList<ElementRef>;

  pluses = [
    { icon: 'assets/data/icons/bus.svg', text: 'рядом есть<br>остановка' },
    { icon: 'assets/data/icons/shopping.svg', text: 'рядом есть<br>торговый центр' },
    { icon: 'assets/data/icons/center.svg', text: 'находится близко <br>к центру' },
    { icon: 'assets/data/icons/metro.svg', text: 'рядом есть метро' }
  ];

  minuses = [
    { icon: 'assets/data/icons/bus.svg', text: 'рядом нет<br>остановки' },
    { icon: 'assets/data/icons/shopping.svg', text: 'рядом нет<br>торгового центра' },
    { icon: 'assets/data/icons/center.svg', text: 'находится далеко от центра' },
    { icon: 'assets/data/icons/metro.svg', text: 'рядом нет метро' }
  ];

  ngAfterViewInit() {
    this.plashkaElements.forEach(element => {
      const width = element.nativeElement.offsetWidth;
      element.nativeElement.style.height = `${width}px`;
    });

    this.loadYandexMapsScript();
  }

  loadYandexMapsScript() {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.onload = () => {
      this.initMap();
    };
    document.body.appendChild(script);
  }

  initMap() {
    // Инициализация карты
    (window as any).ymaps.ready(() => {
      const map = new (window as any).ymaps.Map('map', {
        center: [55.836782, 49.127318],
        zoom: 10
      });

      // Создание метки с использованием стандартной иконки Яндекс.Карт
      const placemark = new (window as any).ymaps.Placemark([55.836782, 49.127318], {
        balloonContent: 'Метка'
      }, {
        preset: 'islands#homeIcon', // Использование стандартной иконки "дом"
        iconColor: '#FF0000' // Цвет иконки
      });

      map.geoObjects.add(placemark);
    });
  }
}
