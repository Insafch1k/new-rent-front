import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { VerificationService } from '../verification/services/verification.service';
import { VerificationStatusResponse } from '../verification/verification.model';
import { TelegramService } from 'src/app/website/services/telegram.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  constructor(
    private verificationService: VerificationService,
    private telegramService: TelegramService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const telegramId = this.telegramService.getTelegramId();
    if (!telegramId) {
      console.error('Telegram ID не найден, пропускаем пользователя');
      return true; // или можешь направить на /welcome для повторной инициализации
    }

    return this.verificationService.getVerificationStatus(telegramId.toString()).pipe(
      switchMap((response: VerificationStatusResponse) => {
        if (response.status === 'approved') {
          this.router.navigate(['/give']);
          return of(false);
        }
        return of(true);
      }),
      catchError((error) => {
        console.error('Ошибка проверки статуса верификации:', error);
        return of(true);
      })
    );
  }
}
