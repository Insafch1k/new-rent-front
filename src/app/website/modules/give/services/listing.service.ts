import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from 'src/app/website/core/constants';

export interface ListingRequest {
  address: string;
  category: string;
  city_id: number;
  contact: string;
  deposit: string;
  description: string;
  district_id: number;
  floor: number;
  photos: string[];
  price: number;
  rooms: string;
  square: number;
  user_id: number;
}

export interface ListingResponse {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = `${API_URL}/listings`;

  constructor(private http: HttpClient) {}

  addListing(listing: ListingRequest): Observable<ListingResponse> {
    return this.http.post<ListingResponse>(this.apiUrl, listing).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  getListingsByUser(userId: number): Observable<any[]> {
    console.log('Fetching listings for user_id:', userId);
    return this.http.get<any[]>(`${this.apiUrl}?user_id=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ListingService error:', error);
    let errorMessage = 'Произошла ошибка';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Клиентская ошибка: ${error.error.message}`;
    } else {
      const serverError = error.error?.error || error.message;
      errorMessage = `Ошибка сервера: ${error.status} - ${serverError}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}