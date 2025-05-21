import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { FavoritesResponse, FavoriteActionResponse } from '../models/favorites.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = '/rentals/monthly/favorite';
  private favoriteIdsSubject = new BehaviorSubject<Set<number>>(new Set());

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  getFavorites(tgId: number): Observable<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(`${this.apiUrl}?tg_id=${tgId}`);
  }

  addFavorite(tgId: number, listingId: number): Observable<FavoriteActionResponse> {
    const body = { tg_id: tgId, listing_id: listingId };
    return new Observable<FavoriteActionResponse>(observer => {
      this.http.post<FavoriteActionResponse>(this.apiUrl, body).subscribe({
        next: (response) => {
          const currentFavorites = this.favoriteIdsSubject.value;
          currentFavorites.add(listingId);
          this.favoriteIdsSubject.next(new Set(currentFavorites));
          observer.next(response);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  removeFavorite(tgId: number, listingId: number): Observable<FavoriteActionResponse> {
    const body = { tg_id: tgId, listing_id: listingId };
    return new Observable<FavoriteActionResponse>(observer => {
      this.http.delete<FavoriteActionResponse>(this.apiUrl, { body }).subscribe({
        next: (response) => {
          const currentFavorites = this.favoriteIdsSubject.value;
          currentFavorites.delete(listingId);
          this.favoriteIdsSubject.next(new Set(currentFavorites));
          observer.next(response);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  private loadFavorites(): void {
    this.getFavorites(6049846765).subscribe({
      next: (response) => {
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