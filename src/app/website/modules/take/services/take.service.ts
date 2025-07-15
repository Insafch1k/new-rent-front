import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GetPreferenceResponse, UpdatePreferenceResponse, Preference } from '../take.model';
import { API_URL } from 'src/app/website/core/constants';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class TakeService {
  private preferenceUrl = `${API_URL}`;

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) {}

  getPreference(): Observable<GetPreferenceResponse> {
    const tgId = this.telegramService.getTelegramId();
    if (!tgId) {
      console.error('Telegram ID не найден');
      return throwError(() => new Error('Telegram ID не найден'));
    }
    const body = { tg_id: tgId };
    return this.http.post<GetPreferenceResponse>(`${this.preferenceUrl}/get_preference`, body);
  }

  updatePreference(preference: Preference): Observable<UpdatePreferenceResponse> {
    const tgId = this.telegramService.getTelegramId();
    if (!tgId) {
      console.error('Telegram ID не найден');
      return throwError(() => new Error('Telegram ID не найден'));
    }
    const body = { tg_id: tgId, preference };
    return this.http.put<UpdatePreferenceResponse>(`${this.preferenceUrl}/update_preference`, body);
  }
}