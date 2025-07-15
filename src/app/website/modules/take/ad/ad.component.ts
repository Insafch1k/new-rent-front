import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swiper, { Navigation, Pagination } from 'swiper';
import { PreferenceService, ListingsResponse, Listing } from '../services/preference.service';
import { FavoritesService } from '../../favourites/services/favorites.service';
import { FavoritesResponse } from '../../favourites/models/favorites.model';
import { ViewHistoryService } from '../services/view-history.service';
import { TelegramService } from 'src/app/website/services/telegram.service';

interface Ad {
  id: number;
  address: string;
  imageUrls: string[];
  price: string;
  metroName: string;
  metroInfo: string;
  date: string;
  recommendations: string;
  listing: Listing;
  isFavorite: boolean;
}

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements AfterViewInit {
  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChildren('image') images!: QueryList<ElementRef>;
  swiper!: Swiper;
  ads: Ad[] = [];
  selectedImageSrc: string | null = null;
  selectedAd: Ad | null = null;
  isOverlayVisible: boolean = false;
  private favoriteIds: Set<number> = new Set();

  priceInfo = [
    { condition: 'ниже рынка', backgroundColor: 'rgba(138, 196, 75, 1)' },
    { condition: 'выше рынка', backgroundColor: 'rgba(240, 68, 56, 1)' }
  ];

  constructor(
    private viewHistoryService: ViewHistoryService,
    private preferenceService: PreferenceService,
    private favoritesService: FavoritesService,
    private router: Router,
    private ngZone: NgZone,
    private telegramService: TelegramService
  ) {
    this.loadFavorites();
    this.loadListings();
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
    this.adjustMainImageHeight();
    this.adjustImagesHeight();
  }

  loadFavorites(): void {
    const tgId = this.telegramService.getTelegramId();
    if (tgId) {
      this.favoritesService.getFavorites(tgId).subscribe({
        next: (response: FavoritesResponse) => {
          this.favoriteIds = new Set(response.listings.map(listing => listing.id));
          this.updateFavoriteStatus();
        },
        error: (error) => {
          console.error('Ошибка загрузки избранного:', error);
        }
      });
    }
  }

  loadListings(): void {
    this.preferenceService.checkPreferences().subscribe({
      next: (response: ListingsResponse) => {
        console.log('Listings response:', response);
        if (!response.has_preferences) {
          console.log('No preferences, navigating to /take/take');
          this.ngZone.run(() => {
            this.router.navigate(['/take/take']);
          });
          return;
        }
        this.ads = response.listings?.map(listing => ({
          id: listing.id,
          address: listing.address,
          imageUrls: listing.photos || [],
          price: `${listing.price} р. в месяц`,
          metroName: this.getMetroName(listing.recommendations) || 'Не указано',
          metroInfo: '',
          date: this.calculateDate(listing.created_at),
          recommendations: this.getPriceRecommendation(listing.recommendations),
          listing,
          isFavorite: this.favoriteIds.has(listing.id)
        })) || [];
        console.log('Transformed ads:', this.ads);
        setTimeout(() => this.swiper?.update(), 0);
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
        this.ngZone.run(() => {
          if (error.message === 'Telegram ID не найден') {
            this.router.navigate(['/welcome']);
          } else {
            this.router.navigate(['/take/take']);
          }
        });
      }
    });
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
      preventClicks: false,
      preventClicksPropagation: false,
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
    this.selectedAd = this.ads.find(ad => ad.imageUrls.includes(src)) || null;
    this.isOverlayVisible = true;
  }

  onBackgroundClick(): void {
    this.selectedImageSrc = null;
    this.selectedAd = null;
    this.isOverlayVisible = false;
  }

  navigateToAdMore(ad: Ad): void {
    const tgId = this.telegramService.getTelegramId();
    if (tgId) {
      // Отправка события в историю
      this.viewHistoryService.addToViewHistory(tgId, ad.id).subscribe({
        next: () => {
          console.log('Добавлено в историю просмотров');
        },
        error: (err) => {
          console.error('Ошибка добавления в историю:', err);
        }
      });

      // Навигация на детальную страницу
      this.ngZone.run(() => {
        this.router.navigate(['/take/ad-more'], { state: { listing: ad.listing } })
          .then(() => console.log('Навигация прошла успешно'))
          .catch(err => console.error('Ошибка навигации:', err));
      });
    }
  }

  getPriceRecommendation(recommendations: any[]): string {
    const priceRec = recommendations?.[0]?.['Цена']?.['Положительные']?.[0] ||
                     recommendations?.[0]?.['Цена']?.['Негативные']?.[0];
    return priceRec?.includes('ниже') ? 'ниже рынка' : priceRec?.includes('выше') ? 'выше рынка' : '';
  }

  getMetroName(recommendations: any[]): string {
    const metroRec = recommendations?.[0]?.['Метро']?.['Негативные']?.[0] ||
                    recommendations?.[0]?.['Метро']?.['Положительные']?.[0];
    return metroRec?.match(/Ближайшее: (.+?) \(([\d.]+ км)\)/)?.[0] || 'Не указано';
  }

  getMetroInfo(recommendations: any[]): string {
    return ''; // Не используется, так как информация теперь в metroName
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

  getPriceCondition(ad: Ad): string {
    return ad.recommendations || '';
  }

  getBackgroundColor(ad: Ad): string {
    const condition = this.getPriceCondition(ad);
    const info = this.priceInfo.find(info => info.condition === condition);
    return info ? info.backgroundColor : '';
  }

  private updateFavoriteStatus(): void {
    this.ads = this.ads.map(ad => ({
      ...ad,
      isFavorite: this.favoriteIds.has(ad.id)
    }));
  }
}
