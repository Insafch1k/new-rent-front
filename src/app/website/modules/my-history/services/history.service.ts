import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/website/core/constants';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) {}

  getHistory(): Observable<any> {
    const telegramId = this.telegramService.getTelegramId();
    return this.http.get(`${API_URL}/profile/history`, {
      params: {
        telegram_id: telegramId!.toString()
      }
    });
  }
}
