import { Component } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  plashkaData = [
    {
      imgSrc: 'https://avatars.mds.yandex.net/i?id=2ce8cba2753b620e95ac1835f5d5775b_l-4375862-images-thumbs&n=13',
      imgPackSrc1: 'https://avatars.mds.yandex.net/i?id=2ce8cba2753b620e95ac1835f5d5775b_l-4375862-images-thumbs&n=13',
      imgPackSrc2: 'https://avatars.mds.yandex.net/i?id=2ce8cba2753b620e95ac1835f5d5775b_l-4375862-images-thumbs&n=13',
      address: '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31',
      price: '50.000 р. в месяц'
    },
    {
      imgSrc: 'https://avatars.mds.yandex.net/i?id=2229f633dee641abeac1f2b86bbf6c4575542169-9229722-images-thumbs&n=13',
      imgPackSrc1: 'https://avatars.mds.yandex.net/i?id=2229f633dee641abeac1f2b86bbf6c4575542169-9229722-images-thumbs&n=13',
      imgPackSrc2: 'https://avatars.mds.yandex.net/i?id=2229f633dee641abeac1f2b86bbf6c4575542169-9229722-images-thumbs&n=13',
      address: '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31',
      price: '70.000 р. в месяц'
    },
    {
      imgSrc: 'https://i.pinimg.com/736x/03/e3/5e/03e35e30ceec030a30a71fc5b63cdfb5.jpg',
      imgPackSrc1: 'https://i.pinimg.com/736x/03/e3/5e/03e35e30ceec030a30a71fc5b63cdfb5.jpg',
      imgPackSrc2: 'https://i.pinimg.com/736x/03/e3/5e/03e35e30ceec030a30a71fc5b63cdfb5.jpg',
      address: '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31',
      price: '70.000 р. в месяц'
    },
    {
      imgSrc: 'https://cdn1.ozone.ru/s3/multimedia-w/6447922220.jpg',
      imgPackSrc1: 'https://cdn1.ozone.ru/s3/multimedia-w/6447922220.jpg',
      imgPackSrc2: 'https://cdn1.ozone.ru/s3/multimedia-w/6447922220.jpg',
      address: '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31',
      price: '70.000 р. в месяц'
    },
    {
      imgSrc: 'https://i.pinimg.com/originals/d1/19/96/d1199670bb52fca2be5752703496f03a.jpg',
      imgPackSrc1: 'https://i.pinimg.com/originals/d1/19/96/d1199670bb52fca2be5752703496f03a.jpg',
      imgPackSrc2: 'https://i.pinimg.com/originals/d1/19/96/d1199670bb52fca2be5752703496f03a.jpg',
      address: '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31',
      price: '70.000 р. в месяц'
    },
    {
      imgSrc: 'https://i.pinimg.com/originals/45/5b/8d/455b8d4d28582b3d58f10e97cce27953.jpg',
      imgPackSrc1: 'https://i.pinimg.com/originals/45/5b/8d/455b8d4d28582b3d58f10e97cce27953.jpg',
      imgPackSrc2: 'https://i.pinimg.com/originals/45/5b/8d/455b8d4d28582b3d58f10e97cce27953.jpg',
      address: '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31',
      price: '70.000 р. в месяц'
    },
  ];

  removePlashka(index: number) {
    this.plashkaData.splice(index, 1);
  }


  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    const words = text.split(' ');
    let truncated = '';
    let lineCount = 0;

    for (const word of words) {
      if (lineCount >= 2) break; // Ограничение до двух строк
      const temp = truncated + word + ' ';
      if (this.calculateLineCount(temp) > lineCount) {
        lineCount++;
      }
      if (lineCount <= 2) {
        truncated = temp;
      }
    }

    return truncated.trim() + (lineCount === 2 ? '...' : '');
  }

  // Вспомогательный метод для подсчёта количества строк
  calculateLineCount(text: string): number {
    const container = document.createElement('div');
    container.style.visibility = 'hidden';
    container.style.position = 'absolute';
    container.style.width = '90%'; // Ширина контейнера (соответствует вашему CSS)
    container.style.font = 'inherit'; // Наследуем шрифт
    container.textContent = text;
    document.body.appendChild(container);
    const lineHeight = parseFloat(getComputedStyle(container).lineHeight);
    const lines = Math.ceil(container.scrollHeight / lineHeight);
    container.remove();
    return lines;
  }
}
