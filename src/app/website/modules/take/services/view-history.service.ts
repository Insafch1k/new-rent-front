import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/website/core/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewHistoryService {
  constructor(private http: HttpClient) {}

  addToViewHistory(telegramId: number, listingId: number): Observable<any> {
    const body = {
      telegram_id: telegramId,
      listing_id: listingId
    };
    return this.http.post(`${API_URL}/listings/view`, body);
  }
}