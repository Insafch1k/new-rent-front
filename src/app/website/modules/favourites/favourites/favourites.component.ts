import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { FavoritesResponse, Listing } from '../models/favorites.model';

interface Plashka {
  listing: Listing;
  imgSrc: string;
  imgPackSrc1: string;
  imgPackSrc2: string;
  address: string;
  price: string;
  metroName: string;
  metroInfo: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  plashkaData: Plashka[] = [];
  private telegramId = 6049846765;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites(this.telegramId).subscribe({
      next: (response: FavoritesResponse) => {
        console.log('Избранное загружено:', response);
        this.plashkaData = response.listings.map(listing => ({
          listing,
          imgSrc: listing.photos[0] || 'assets/placeholder.jpg',
          imgPackSrc1: listing.photos[1] || 'assets/placeholder.jpg',
          imgPackSrc2: listing.photos[2] || 'assets/placeholder.jpg',
          address: listing.address || 'Не указано',
          price: `${listing.price} р. в месяц`,
          metroName: this.getMetroName(listing.recommendations) || 'Не указано',
          metroInfo: this.getMetroInfo(listing.recommendations) || 'Не указано',
          description: this.truncateText(listing.description || 'Описание отсутствует', 100),
          date: this.calculateDate(listing.created_at)
        }));
      },
      error: (error) => {
        console.error('Ошибка загрузки избранного:', error);
        this.plashkaData = [];
      }
    });
  }

  navigateToAdMore(plashka: Plashka): void {
    this.router.navigate(['/take/ad-more'], { state: { listing: plashka.listing } })
      .then(() => console.log('Навигация в /take/ad-more успешна'))
      .catch(err => console.error('Ошибка навигации:', err));
  }

  removePlashka(index: number): void {
    const listingId = this.plashkaData[index].listing.id;
    this.favoritesService.removeFavorite(this.telegramId, listingId).subscribe({
      next: (response) => {
        console.log('Удаление из избранного:', response);
        this.plashkaData.splice(index, 1);
      },
      error: (error) => {
        console.error('Ошибка удаления из избранного:', error);
      }
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  getMetroName(recommendations: any[]): string {
    return recommendations?.[0]?.['метро']?.['Положительные']?.[0] ||
           recommendations?.[0]?.['метро']?.['Отрицательные']?.[0] ||
           '';
  }

  getMetroInfo(recommendations: any[]): string {
    const metroRec = recommendations?.[0]?.['метро']?.['Отрицательные']?.[0] ||
                    recommendations?.[0]?.['метро']?.['Положительные']?.[0];
    return metroRec?.match(/~(\d+ мин\. пешком)/)?.[0] || '';
  }

  calculateDate(createdAt: string | null): string {
    if (!createdAt) return 'Не указано';
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'сегодня';
    if (diffDays === 1) return '1 д. назад';
    return `${diffDays} д. назад`;
  }
}