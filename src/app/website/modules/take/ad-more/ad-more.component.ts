import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-ad-more',
  templateUrl: './ad-more.component.html',
  styleUrls: ['./ad-more.component.scss']
})
export class AdMoreComponent implements AfterViewInit {
  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChildren('image') images!: QueryList<ElementRef>;
  @ViewChildren('plashka') plashkaElements!: QueryList<ElementRef>;

  imageUrls: string[] = [
    'https://avatars.mds.yandex.net/i?id=c3f130bfaefaba992e9a2b311191b7d3_l-4724533-images-thumbs&n=13',
    'https://yandex-images.clstorage.net/c9LNm6431/bc46fauGH/M9fbkgkVc5UZfvFDEMuxszoa8xvEPaBvCItuZ15w--3xAOmfH3IcGmn5vmtNkcZzDc4lUtBJiSCmo1tgMLrp7nLSjpNoBAqJGWqgbzn72YN6T8NuyGioCxiWClYf6BINfMVQerKykfOY-aJeDYGvQ1z-wOq04Fh0p0oy9NDTZH-vJ8vqQVliPek6rDvI9yXzev8DE9jo_P54c1_zs8R2sUQFJPIi2iUbvM2eVqE5ridEanzLJOSMHKdGivysl0zT_9NDImmdIu1tpojLOMeRC06za_9MXKCu8CvHd9e80rHAlbymroI1B5CpGuoBnVJniK6Ai5AQ2KTjog5U2FMEbx8_A1ohPa6B6f4cM2iP2bMa_w-vuHhQUhAzx0vP9MolbFV8et7CzVNgIXIqiQ2mGyQyoIeovOQkE_aigNgvCAsXo-da5Qn2hak2bENAA5kTolurL5SE3KKQAxsLC3Q-aSSFqPYi0mlfhA0u0n1FRquopoiLiExgDIvKNoRcQ3SL8zeL1q05EqUZ3pRblOcBb44na-t4ZBSKLL_bLwtMOoFIRRziJnbRd6ilcrqtuVZXAPpoh7Bk-ISTJhYM5CMA_1df19ptBWKhlTacb6BTBeNu21ef5Hxc8kSTm8v_jNYNyGHEdi6OAZcwMQIO2Zmu2yD6tMvsUFwQJ8aeAGwXDBt7oz9yHbVyJeliNENYZ-mTfj9zO2yg9CJwty8vT8wmUUzh4ALqOiWbfHUiznU1DueQOjg33HR4CHf2_vBoKxzbU-sDpoF59qEZUuyzoHdFw-LrA5PovJQCMAtXP8NUvhGkbbz2frYZ-5iB9i6FzZYvzA5sI-z8dKA3niY4WB_A5x-bW3ZpBaZ1fc4IJ-RDLaf2Q2-nwMQghiyL149niKIBqB0Ubm5yAX8AzRbqpUWOv7A-AIekBCiE776m9PyndO8XA3tuSX0GfRU6qEPIU5XLup_rt1xg9OZwJ2_Ddwi8',
    'https://i.pinimg.com/originals/55/1d/1f/551d1f8df2c5e609e13b499c53f7408a.png',
    'https://i.pinimg.com/originals/1e/1f/30/1e1f308dc1342dc258a72e06a7de7e0d.jpg',
    'https://yandex-images.clstorage.net/c9LNm6431/bc46fauGH/M9fbkgkVc5UZfvFDEMuxszoa8xvEPaBvCItuZhJJppydAMzDO1tACzXFvmN81J8udKd4GvkNjQyv82YkMLrp_nbqiptADHuZCVq4Z2CCvfMOL_8rnXSYfjXDRmYWWBJ1fMkkOsbeqcuEJcJiJYXaGiziaOtJWFDwn_aKNASXhAPzF3fWJRE68b2q6Gs0c7EPfi9P6-BkGCrAo6Mzs_Q-EcDx5E5OTsF_bAH2Xi0pYhtI-vxXaMhUJPf2howM68ArX0eDXu05_rFtLnRPxIOBu4YbA4MM8Kx2kCv7qzeQRrXAdXTWGsKZb3AtktqRicbnCDY4qyh8oHBPsmIIpJ8EY-Onbx6VcV49Aaos2zzTyfM-T0_nXASIhmzL46sLiA6tVNm0Fsay2Zck3RqyUQFWE3SapIskRAxMz0I2pHCfeG-Hr_P6lbVqZQXq5KtM-0WznvfrQ9wodAqcS9N3S0yOWRiRZMJKTskzKDk27qn1HvPEFjCjKGT8yOfaCjB0GxQTB0tnlhn9WoElWgxTVC-hK-Lbl4MYxJTCtPdvt29Mtl3w_aR2XkptiwAVnrLBJeLjOL5sQyRc1FBvwuYQ_KN0Z3PvD8oVPWbxIdbkW2AbFS9uO2u_bFiMisyfQ_eLuHaxfH2ArspClVvgjQrCdVHCG7SebJ9oAOD0-3YGmPArQGuXw_MivU3W4aWqsPNM4yHDHiuPm8jQUCIcq2dDbwg2QSD5AIq-hiF_7MFO4rX9bruILqwTlDDE0OMmNvgAL3x7V-u7HmnRGmUhWoArvBsxb063W-tgVExCPOvbO3-ErtlgEYzWShKtQ4wlujZVDZYjQHKYR4AATNxLZl4gyB9Ip2uny0a5OWY19T4czyhfBQcqo_OHVHw09rj3W7vPIHLFcB38ftICaVsIvfbWkS0eO9AOqCskSLSAb75-oAS78BNjr1NmoRkelf1W6G9McxW_Ru8vA0TgkCLYq_cDgzDw',
    'https://avatars.mds.yandex.net/i?id=57f5d9a1fe40bd23957c0c00d938b8d9_l-5233675-images-thumbs&n=13'
  ];

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

  address: string = '2-к квартира, г.Казань, р-н Северный, ул.Маршала Чуйкова 67, кв.31';
  price: string = '50.000 р. в месяц';

  selectedImageSrc: string | null = null;
  isOverlayVisible: boolean = false;

  priceInfo = [
    { condition: 'ниже рынка', backgroundColor: 'rgba(138, 196, 75, 1)' },
    { condition: 'выше рынка', backgroundColor: 'rgba(240, 68, 56, 1)' }
  ];

  ngAfterViewInit(): void {
    this.adjustMainImageHeight();
    this.adjustImagesHeight();
    this.adjustPlashkaHeight();
    this.loadYandexMapsScript();
  }

  adjustMainImageHeight(): void {
    const imgElement = this.mainImage.nativeElement;
    const width = imgElement.offsetWidth;
    const height = (width * 9) / 16;
    imgElement.style.height = `${height}px`;
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
    return this.price.includes('ниже') ? 'ниже рынка' : 'выше рынка';
  }

  getBackgroundColor(): string {
    const condition = this.getPriceCondition();
    const info = this.priceInfo.find(info => info.condition === condition);
    return info ? info.backgroundColor : '';
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
    (window as any).ymaps.ready(() => {
      const map = new (window as any).ymaps.Map('map', {
        center: [55.836782, 49.127318],
        zoom: 10
      });

      const placemark = new (window as any).ymaps.Placemark([55.836782, 49.127318], {
        balloonContent: 'Метка'
      }, {
        preset: 'islands#homeIcon',
        iconColor: '#FF0000'
      });

      map.geoObjects.add(placemark);
    });
  }
}
