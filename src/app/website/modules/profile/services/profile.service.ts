import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.interface';
import { API_URL } from '../../../core/constants';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) {}

  getProfile(): Observable<UserResponse> {
    const telegramId = this.telegramService.getTelegramId();
    return this.http.get<UserResponse>(`${API_URL}/profile`, {
      params: {
        telegram_id: telegramId!.toString() 
      }
    });
  }
}
