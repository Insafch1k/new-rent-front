import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../services/preference.service';

@Component({
  selector: 'app-ad-more',
  templateUrl: './ad-more.component.html',
  styleUrls: ['./ad-more.component.scss']
})
export class AdMoreComponent implements AfterViewInit {
  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChildren('image') images!: QueryList<ElementRef>;
  @ViewChildren('plashka') plashkaElements!: QueryList<ElementRef>;

  listing: Listing | null = null;
  imageUrls: string[] = [];
  address: string = '';
  price: string = '';
  floor: number = 0;
  square: number = 0;
  description: string = '';
  contact: string = '';
  pluses: { icon: string; text: string }[] = [];
  minuses: { icon: string; text: string }[] = [];
  metroName: string = '';
  selectedImageSrc: string | null = null;
  isOverlayVisible: boolean = false;

  priceInfo = [
    { condition: 'ниже рынка', backgroundColor: 'rgba(138, 196, 75, 1)' },
    { condition: 'выше рынка', backgroundColor: 'rgba(240, 68, 56, 1)' }
  ];

  private iconMap: { [key: string]: string } = {
    'Метро': 'assets/data/images/metro.svg',
    'Остановки': 'assets/data/images/bus.svg',
    'Торговые центры': 'assets/data/images/ts.svg',
    'Центр города': 'assets/data/images/center.svg'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.listing = navigation?.extras?.state?.['listing'] as Listing | null;
    if (this.listing) {
      this.imageUrls = this.listing.photos || [];
      this.address = this.listing.address || 'Не указано';
      this.price = `${this.listing.price} р. в месяц` || 'Не указано';
      this.floor = this.listing.floor || 0;
      this.square = this.listing.square || 0;
      this.description = this.listing.description || 'Описание отсутствует';
      this.contact = this.listing.contact || '';
      this.metroName = this.getMetroName(this.listing.recommendations) || 'Не указано';
      this.pluses = this.getPluses(this.listing.recommendations);
      this.minuses = this.getMinuses(this.listing.recommendations);
    } else {
      console.error('No listing data provided');
      this.router.navigate(['/take/ad']);
    }
  }

  ngAfterViewInit(): void {
    this.adjustMainImageHeight();
    this.adjustImagesHeight();
    this.adjustPlashkaHeight();
    this.loadYandexMapsScript();
  }

  adjustMainImageHeight(): void {
    const imgElement = this.mainImage?.nativeElement;
    if (imgElement) {
      const width = imgElement.offsetWidth;
      const height = (width * 9) / 16;
      imgElement.style.height = `${height}px`;
    }
  }

  adjustImagesHeight(): void {
    this.images.forEach(image => {
      const imgElement = image.nativeElement;
      const width = imgElement.offsetWidth;
      const height = (width * 10) / 9;
      imgElement.style.height = `${height}px`;
    });
  }

  adjustPlashkaHeight(): void {
    this.plashkaElements.forEach(element => {
      const width = element.nativeElement.offsetWidth;
      element.nativeElement.style.height = `${width}px`;
    });
  }

  onResize(event: Event): void {
    this.adjustMainImageHeight();
    this.adjustImagesHeight();
  }

  onImageClick(src: string): void {
    this.selectedImageSrc = src;
    this.isOverlayVisible = true;
  }

  onBackgroundClick(): void {
    this.selectedImageSrc = null;
    this.isOverlayVisible = false;
  }

  getPriceCondition(): string {
    const priceRec = this.listing?.recommendations?.[0]?.['Цена']?.['Положительные']?.[0] ||
                     this.listing?.recommendations?.[0]?.['Цена']?.['Негативные']?.[0];
    return priceRec?.includes('ниже') ? 'ниже рынка' : priceRec?.includes('выше') ? 'выше рынка' : '';
  }

  getBackgroundColor(): string {
    const condition = this.getPriceCondition();
    const info = this.priceInfo.find(info => info.condition === condition);
    return info ? info.backgroundColor : '';
  }

  getMetroName(recommendations: any[]): string {
    const metroRec = recommendations?.[0]?.['Метро']?.['Негативные']?.[0] ||
                    recommendations?.[0]?.['Метро']?.['Положительные']?.[0];
    const match = metroRec?.match(/Ближайшее: (.+?) \(([\d.]+ км)\)/);
    return match ? match[0] : 'Не указано';
  }

  getPluses(recommendations: any[]): { icon: string; text: string }[] {
    const result: { icon: string; text: string }[] = [];
    recommendations?.[0]?.['Метро']?.['Положительные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Метро'], text: rec.replace(/ \([\d.]+ км\)/, '') });
    });
    recommendations?.[0]?.['Остановки']?.['Положительные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Остановки'], text: rec });
    });
    recommendations?.[0]?.['Торговые центры']?.['Положительные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Торговые центры'], text: rec.replace(/ \([\d.]+ км\)/, '') });
    });
    recommendations?.[0]?.['Центр города']?.['Положительные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Центр города'], text: rec });
    });
    return result.slice(0, 3);
  }

  getMinuses(recommendations: any[]): { icon: string; text: string }[] {
    const result: { icon: string; text: string }[] = [];
    recommendations?.[0]?.['Метро']?.['Негативные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Метро'], text: rec.replace(/ \([\d.]+ км\)/, '') });
    });
    recommendations?.[0]?.['Остановки']?.['Негативные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Остановки'], text: rec });
    });
    recommendations?.[0]?.['Торговые центры']?.['Негативные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Торговые центры'], text: rec.replace(/ \([\d.]+ км\)/, '') });
    });
    recommendations?.[0]?.['Центр города']?.['Негативные']?.forEach((rec: string) => {
      result.push({ icon: this.iconMap['Центр города'], text: rec.replace(/ \([\d.]+ км\)/, '') });
    });
    return result.slice(0, 3);
  }

  calculateDate(createdAt: string): string {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'сегодня';
    if (diffDays === 1) return '1 д. назад';
    return `${diffDays} д. назад`;
  }

  loadYandexMapsScript(): void {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.onload = () => {
      this.initMap();
    };
    document.body.appendChild(script);
  }

  initMap(): void {
    (window as any).ymaps.ready(() => {
      const map = new (window as any).ymaps.Map('map', {
        center: [55.75, 49.13],
        zoom: 12
      });
      (window as any).ymaps.geocode(this.address, { results: 1 }).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();
        const placemark = new (window as any).ymaps.Placemark(coords, {
          balloonContent: this.address
        }, {
          preset: 'islands#homeIcon',
          iconColor: '#FF0000'
        });
        map.geoObjects.add(placemark);
        map.setCenter(coords, 14);
      }).catch((err: any) => {
        console.error('Geocoding error:', err);
      });
    });
  }
}