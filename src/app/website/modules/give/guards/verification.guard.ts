import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { VerificationService } from '../verification/services/verification.service';
import { VerificationStatusResponse } from '../verification/verification.model';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  private readonly telegramId = '825963774';

  constructor(
    private verificationService: VerificationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificationService.getVerificationStatus(this.telegramId).pipe(
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