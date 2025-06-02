import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/website/core/constants';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  getHistory(telegramId: string = '6049846765'): Observable<any> {
    return this.http.get(`${API_URL}/profile/history?telegram_id=${telegramId}`);
  }
}