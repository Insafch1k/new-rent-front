import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingService } from './website/shared/loading-spinner/loading.service';
import { Observable } from 'rxjs';
import { routeAnimation } from './website/shared/route-animations';

declare global {
  interface Window {
    Telegram: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    // Подписка на события навигации для спиннера
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (event instanceof NavigationEnd) {
        this.loadingService.hide();
      }
    });

    // Логика Telegram Web App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.enableClosingConfirmation(false);
      tg.setHeaderColor('#4285F4');
      tg.disableVerticalSwipes();

      const telegramId = tg.initDataUnsafeuser?.id;
      if (telegramId) {
        localStorage.setItem('telegramId', telegramId.toString());
        console.log("✅ Telegram ID:", telegramId);
      }


      // Получаем номер телефона из URL (если передан ботом)
      const urlParams = new URLSearchParams(window.location.search);
      const phoneFromUrl = urlParams.get('phone');

      if (phoneFromUrl) {
        localStorage.setItem('userPhoneNumber', phoneFromUrl);
        console.log("✅ Номер телефона из URL:", phoneFromUrl);
      }

      // Получаем номер из initDataUnsafe (если есть)
      const phoneFromInitData = tg.initDataUnsafe?.user?.phone_number;
      if (phoneFromInitData) {
        localStorage.setItem('userPhoneNumber', phoneFromInitData);
        console.log("✅ Номер телефона из initDataUnsafe:", phoneFromInitData);
      }

      // Проверяем, был ли пользователь ранее
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        // Если это первый визит, устанавливаем флаг и перенаправляем на welcome
        localStorage.setItem('hasVisited', 'true');
        this.router.navigate(['/welcome']);
      } else {
        // Если пользователь уже был, перенаправляем на main (или текущий маршрут)
        if (this.router.url === '/' || this.router.url === '') {
          this.router.navigate(['/main']);
        }
      }
    }
  }

  getRouteAnimationState(outlet: any) {
    return outlet?.activatedRouteData?.animation || 'default';
  }
}