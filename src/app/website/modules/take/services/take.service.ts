import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPreferenceResponse, UpdatePreferenceResponse, Preference } from '../take.model';
import { API_URL } from 'src/app/website/core/constants';

@Injectable({
  providedIn: 'root'
})
export class TakeService {
  private preferenceUrl = `${API_URL}`;

  constructor(private http: HttpClient) {}

  getPreference(tgId: number): Observable<GetPreferenceResponse> {
    const body = { tg_id: tgId };
    return this.http.post<GetPreferenceResponse>(`${this.preferenceUrl}/get_preference`, body);
  }

  updatePreference(tgId: number, preference: Preference): Observable<UpdatePreferenceResponse> {
    const body = { tg_id: tgId, preference };
    return this.http.put<UpdatePreferenceResponse>(`${this.preferenceUrl}/update_preference`, body);
  }
}