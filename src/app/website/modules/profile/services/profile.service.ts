import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.interface';
import { API_URL } from '../../../core/constants';
@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private readonly TELEGRAM_ID = 825963774;

    constructor(private http: HttpClient) {}

    getProfile(): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${API_URL}/profile`, {
            params: {
                telegram_id: this.TELEGRAM_ID.toString()
            }
        });
    }
}
 