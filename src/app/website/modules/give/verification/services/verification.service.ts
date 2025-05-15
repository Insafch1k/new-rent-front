import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from 'src/app/website/core/constants';
import { VerificationRequest, VerificationResponse, VerificationStatusResponse } from '../verification.model';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private readonly apiUrl = `${API_URL}/verification`;

  constructor(private http: HttpClient) {}

  submitVerification(request: VerificationRequest): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(this.apiUrl, request).pipe(
      catchError(this.handleError)
    );
  }

  getVerificationStatus(telegramId: string): Observable<VerificationStatusResponse> {
    return this.http.get<VerificationStatusResponse>(this.apiUrl, {
      params: { telegram_id: telegramId }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Произошла ошибка при отправке данных';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      errorMessage = `Код ошибки: ${error.status}, Сообщение: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}