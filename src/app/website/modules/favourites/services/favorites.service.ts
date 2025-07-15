import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { FavoritesResponse, FavoriteActionResponse } from '../models/favorites.model';
import { API_URL } from 'src/app/website/core/constants';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = `${API_URL}/profile/favorites`;
  private favoriteIdsSubject = new BehaviorSubject<Set<number>>(new Set());
  private tgId: number;

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) {
    this.tgId = this.telegramService.getTelegramId()!;
    this.loadFavorites();
  }

  getFavorites(tgId: number = this.tgId): Observable<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(`${this.apiUrl}?tg_id=${tgId}`);
  }

  addFavorite(listingId: number): Observable<FavoriteActionResponse> {
    const currentFavorites = this.favoriteIdsSubject.value;
    if (currentFavorites.has(listingId)) {
      console.log('Объявление уже в избранном:', listingId);
      return of({ message: 'Already in favorites' } as FavoriteActionResponse);
    }

    const body = { tg_id: this.tgId, listing_id: listingId };
    return new Observable<FavoriteActionResponse>(observer => {
      this.http.post<FavoriteActionResponse>(this.apiUrl, body).subscribe({
        next: (response) => {
          console.log('Ответ сервера (addFavorite):', response);
          currentFavorites.add(listingId);
          this.favoriteIdsSubject.next(new Set(currentFavorites));
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.error('Ошибка сервера (addFavorite):', error);
          observer.error(error);
        }
      });
    });
  }

  removeFavorite(listingId: number): Observable<FavoriteActionResponse> {
    const body = { tg_id: this.tgId, listing_id: listingId };
    return new Observable<FavoriteActionResponse>(observer => {
      this.http.delete<FavoriteActionResponse>(this.apiUrl, { body }).subscribe({
        next: (response) => {
          console.log('Ответ сервера (removeFavorite):', response);
          const currentFavorites = this.favoriteIdsSubject.value;
          currentFavorites.delete(listingId);
          this.favoriteIdsSubject.next(new Set(currentFavorites));
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.error('Ошибка сервера (removeFavorite):', error);
          observer.error(error);
        }
      });
    });
  }

  private loadFavorites(): void {
    this.getFavorites().subscribe({
      next: (response) => {
        console.log('Загруженные избранные ID:', response.listings.map(listing => listing.id));
        const favoriteIds = new Set(response.listings.map(listing => listing.id));
        this.favoriteIdsSubject.next(favoriteIds);
      },
      error: (error) => console.error('Ошибка загрузки избранного:', error)
    });
  }

  getFavoriteIds(): Observable<Set<number>> {
    return this.favoriteIdsSubject.asObservable();
  }
}
