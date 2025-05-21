import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference, PreferenceResponse } from '../models/preference.model';
import { API_URL } from 'src/app/website/core/constants';

export interface Listing {
  id: number;
  address: string;
  category: 'monthly' | 'daily';
  city_id: number | null;
  contact: string | null;
  created_at: string;
  deposit: string | null;
  description: string;
  district_id: number;
  district_name: string;
  floor: number;
  link_url: string;
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

  constructor(private http: HttpClient) {}

  createPreference(tgId: number, preference: Preference): Observable<PreferenceResponse> {
    const body = { tg_id: tgId, preference };
    return this.http.post<PreferenceResponse>(`${API_URL}/create_preference`, body);
  }

  checkPreferences(tgId: number): Observable<ListingsResponse> {
    const body = { tg_id: tgId };
    return this.http.post<ListingsResponse>(this.apiUrl, body);
  }
}