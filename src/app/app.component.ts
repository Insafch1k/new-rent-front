import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare global {
  interface Window {
    Telegram: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.enableClosingConfirmation(false);
      tg.setHeaderColor('#4285F4');
      tg.disableVerticalSwipes();

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
}