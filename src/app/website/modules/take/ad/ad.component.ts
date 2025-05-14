import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements AfterViewInit {
  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChildren('image') images!: QueryList<ElementRef>;

  swiper!: Swiper;

  // JSON с данными
  private listings = {
    "listings": [
      {
        "address": "ул. Московская, д. 8",
        "category": "daily",
        "city_id": null,
        "contact": "+7 999 123-45-67",
        "created_at": "2025-04-05T00:00:00",
        "deposit": "10000",
        "description": "Квартира рядом с метро",
        "district_id": 5,
        "district_name": null,
        "floor": 5,
        "id": 5456,
        "link_url": "https://example.com/9",
        "photos": [
          "https://sun9-88.userapi.com/impg/4AT_vkCRpPyZ0R8COKIkssmOZCfXzlWsO98nKA/hf8kG0Z8Ej4.jpg?size=1280x689&quality=95&sign=0ac89b0b905ad394ae4199f215d4ff15&c_uniq_tag=Y4_RTlkWaapVlxUaGPPFUF1dBKXjvSJYXpHu0V70nLk&type=album",
          "https://i.pinimg.com/originals/55/1d/1f/551d1f8df2c5e609e13b499c53f7408a.png",
          "https://i.pinimg.com/originals/1e/1f/30/1e1f308dc1342dc258a72e06a7de7e0d.jpg",
          "https://avatars.mds.yandex.net/i?id=57f5d9a1fe40bd23957c0c00d938b8d9_l-5233675-images-thumbs&n=13"
        ],
        "price": 53000,
        "recommendations": [],
        "rooms": "2",
        "square": 58.0,
        "user_id": null
      },
      {
        "address": "ул. Баумана, д. 15",
        "category": "daily",
        "city_id": null,
        "contact": "+7 999 987-65-43",
        "created_at": "2025-04-06T14:20:00",
        "deposit": "8000",
        "description": "Уютная квартира в центре",
        "district_id": 2,
        "district_name": null,
        "floor": 3,
        "id": 5457,
        "link_url": "https://example.com/10",
        "photos": [
          "https://avatars.mds.yandex.net/i?id=c3f130bfaefaba992e9a2b311191b7d3_l-4724533-images-thumbs&n=13",
          "https://i.pinimg.com/originals/55/1d/1f/551d1f8df2c5e609e13b499c53f7408a.png",
          "https://i.pinimg.com/originals/1e/1f/30/1e1f308dc1342dc258a72e06a7de7e0d.jpg",
          "https://avatars.mds.yandex.net/i?id=57f5d9a1fe40bd23957c0c00d938b8d9_l-5233675-images-thumbs&n=13"
        ],
        "price": 45000,
        "recommendations": ["ниже рынка"],
        "rooms": "1",
        "square": 40.0,
        "user_id": null
      },
      {
        "address": "ул. Чистопольская, д. 22",
        "category": "daily",
        "city_id": null,
        "contact": "+7 999 555-12-34",
        "created_at": "2025-04-07T09:15:00",
        "deposit": "12000",
        "description": "Просторная квартира с видом на реку",
        "district_id": 7,
        "district_name": null,
        "floor": 10,
        "id": 5458,
        "link_url": "https://example.com/11",
        "photos": [
          "https://yandex-images.clstorage.net/c9LNm6431/bc46fauGH/M9fbkgkVc5UZfvFDEMuxszoa8xvEPaBvCItuZ15w--3xAOmfH3IcGmn5vmtNkcZzDc4lUtBJiSCmo1tgMLrp7nLSjpNoBAqJGWqgbzn72YN6T8NuyGioCxiWClYf6BINfMVQerKykfOY-aJeDYGvQ1z-wOq04Fh0p0oy9NDTZH-vJ8vqQVliPek6rDvI9yXzev8DE9jo_P54c1_zs8R2sUQFJPIi2iUbvM2eVqE5ridEanzLJOSMHKdGivysl0zT_9NDImmdIu1tpojLOMeRC06za_9MXKCu8CvHd9e80rHAlbymroI1B5CpGuoBnVJniK6Ai5AQ2KTjog5U2FMEbx8_A1ohPa6B6f4cM2iP2bMa_w-vuHhQUhAzx0vP9MolbFV8et7CzVNgIXIqiQ2mGyQyoIeovOQkE_aigNgvCAsXo-da5Qn2hak2bENAA5kTolurL5SE3KKQAxsLC3Q-aSSFqPYi0mlfhA0u0n1FRquopoiLiExgDIvKNoRcQ3SL8zeL1q05EqUZ3pRblOcBb44na-t4ZBSKLL_bLwtMOoFIRRziJnbRd6ilcrqtuVZXAPpoh7Bk-ISTJhYM5CMA_1df19ptBWKhlTacb6BTBeNu21ef5Hxc8kSTm8v_jNYNyGHEdi6OAZcwMQIO2Zmu2yD6tMvsUFwQJ8aeAGwXDBt7oz9yHbVyJeliNENYZ-mTfj9zO2yg9CJwty8vT8wmUUzh4ALqOiWbfHUiznU1DueQOjg33HR4CHf2_vBoKxzbU-sDpoF59qEZUuyzoHdFw-LrA5PovJQCMAtXP8NUvhGkbbz2frYZ-5iB9i6FzZYvzA5sI-z8dKA3niY4WB_A5x-bW3ZpBaZ1fc4IJ-RDLaf2Q2-nwMQghiyL149niKIBqB0Ubm5yAX8AzRbqpUWOv7A-AIekBCiE776m9PyndO8XA3tuSX0GfRU6qEPIU5XLup_rt1xg9OZwJ2_Ddwi8",
          "https://i.pinimg.com/originals/55/1d/1f/551d1f8df2c5e609e13b499c53f7408a.png",
          "https://i.pinimg.com/originals/1e/1f/30/1e1f308dc1342dc258a72e06a7de7e0d.jpg",
          "https://avatars.mds.yandex.net/i?id=57f5d9a1fe40bd23957c0c00d938b8d9_l-5233675-images-thumbs&n=13"
        ],
        "price": 60000,
        "recommendations": ["выше рынка"],
        "rooms": "3",
        "square": 75.0,
        "user_id": null
      }
    ]
  };

  // Преобразованные данные для шаблона
  ads = this.listings.listings.map(listing => ({
    address: listing.address,
    imageUrls: listing.photos,
    price: `${listing.price} р. в месяц`,
    metroName: 'Не указано', // Заглушка, так как metroName отсутствует в JSON
    metroInfo: 'Не указано', // Заглушка, так как metroInfo отсутствует в JSON
    date: this.calculateDate(listing.created_at),
    recommendations: listing.recommendations // Сохраняем recommendations для getPriceCondition
  }));

  selectedImageSrc: string | null = null;
  selectedAd: any | null = null;
  isOverlayVisible: boolean = false;

  priceInfo = [
    { condition: 'ниже рынка', backgroundColor: 'rgba(138, 196, 75, 1)' },
    { condition: 'выше рынка', backgroundColor: 'rgba(240, 68, 56, 1)' }
  ];

  ngAfterViewInit(): void {
    this.initializeSwiper();
    this.adjustMainImageHeight();
    this.adjustImagesHeight();
  }

  initializeSwiper(): void {
    this.swiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      centeredSlides: true,
      loop: false,
      touchRatio: 1.5,
      threshold: 10,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      preventClicks: false,
      preventClicksPropagation: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      allowTouchMove: true,
      touchEventsTarget: 'wrapper',
      touchStartPreventDefault: false
    });
  }

  prevSlide(): void {
    this.swiper.slidePrev();
  }

  nextSlide(): void {
    this.swiper.slideNext();
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

  onResize(event: Event): void {
    this.adjustMainImageHeight();
    this.adjustImagesHeight();
  }

  onImageClick(src: string): void {
    this.selectedImageSrc = src;
    this.selectedAd = this.ads.find(ad => ad.imageUrls.includes(src));
    this.isOverlayVisible = true;
  }

  onBackgroundClick(): void {
    this.selectedImageSrc = null;
    this.selectedAd = null;
    this.isOverlayVisible = false;
  }

  getPriceCondition(ad: any): string {
    return ad.recommendations.length ? ad.recommendations[0] : '';
  }

  getBackgroundColor(ad: any): string {
    const condition = this.getPriceCondition(ad);
    const info = this.priceInfo.find(info => info.condition === condition);
    return info ? info.backgroundColor : '';
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
}