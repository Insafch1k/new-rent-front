import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Preference, PreferenceResponse } from '../models/preference.model';
import { API_URL } from 'src/app/website/core/constants';
import { TelegramService } from 'src/app/website/services/telegram.service';

export interface Listing {
  id: number;
  address: string;
  category: 'monthly' | 'daily';
  contact: string | null;
  created_at: string;
  deposit: string | null;
  description: string;
  district_name: string;
  floor: number;
  link_url: string;
  latitude: number;
  longitude: number;
  photos: string[];
  price: number;
  recommendations: Array<{
    [key: string]: {
      Положительные: string[];
      Негативные: string[];
    };
  }>;
  rooms: string;
  square: number;
  user_id: number | null;
}

export interface ListingsResponse {
  has_preferences: boolean;
  listings?: Listing[];
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private apiUrl = `${API_URL}/rentals/monthly`;

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService 
  ) {}

  createPreference(preference: Preference): Observable<PreferenceResponse> {
    const tgId = this.telegramService.getTelegramId();
    if (!tgId) {
      console.error('Telegram ID не найден');
      return throwError(() => new Error('Telegram ID не найден'));
    }
    const body = { tg_id: tgId, preference };
    return this.http.post<PreferenceResponse>(`${API_URL}/create_preference`, body);
  }

  checkPreferences(): Observable<ListingsResponse> {
    const tgId = this.telegramService.getTelegramId();
    if (!tgId) {
      console.error('Telegram ID не найден');
      return throwError(() => new Error('Telegram ID не найден'));
    }
    const body = { tg_id: tgId };
    return this.http.post<ListingsResponse>(this.apiUrl, body);
  }

  getCities(): Observable<{ cities: { id: number, name: string }[] }> {
    return this.http.get<{ cities: { id: number, name: string }[] }>(`${API_URL}/cities`);
  }

  getDistricts(cityId: number): Observable<{ districts: { id: number, name: string }[] }> {
    return this.http.get<{ districts: { id: number, name: string }[] }>(`${API_URL}/districts?city_id=${cityId}`);
  }
}