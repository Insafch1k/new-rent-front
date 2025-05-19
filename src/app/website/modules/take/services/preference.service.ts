import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference, PreferenceResponse } from '../models/preference.model';
import { API_URL } from 'src/app/website/core/constants';

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

  checkPreferences(tgId: number): Observable<{ has_preferences: boolean }> {
    const body = { tg_id: tgId };
    return this.http.post<{ has_preferences: boolean }>(this.apiUrl, body);
  }
}