import { Component, OnInit } from '@angular/core';

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
  ngOnInit() {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();
      tg.enableClosingConfirmation(false);
      tg.setHeaderColor('#4285F4');
      tg.disableVerticalSwipes();

      // 1️⃣ Получаем номер телефона из URL (если передан ботом)
      const urlParams = new URLSearchParams(window.location.search);
      const phoneFromUrl = urlParams.get('phone');

      if (phoneFromUrl) {
        localStorage.setItem('userPhoneNumber', phoneFromUrl);
        console.log("✅ Номер телефона из URL:", phoneFromUrl);
      }

      // 2️⃣ Получаем номер из initDataUnsafe (если есть)
      const phoneFromInitData = tg.initDataUnsafe?.user?.phone_number;
      if (phoneFromInitData) {
        localStorage.setItem('userPhoneNumber', phoneFromInitData);
        console.log("✅ Номер телефона из initDataUnsafe:", phoneFromInitData);
      }
    }
  }
}
