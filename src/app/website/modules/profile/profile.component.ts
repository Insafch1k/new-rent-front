import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    Telegram: any;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  avatarUrl: string = 'https://via.placeholder.com/150';
  username: string = 'Гость'; // Имя пользователя
  userId: string = 'Нет юзернейма'; // Юзернейм вместо ID
  phoneNumber: string = 'Номер не доступен';

  ngOnInit() {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;

      if (user) {
        this.username = user.first_name || 'Гость'; // Имя пользователя вместо username
        this.userId = user.username ? `@${user.username}` : 'Нет юзернейма'; // Юзернейм вместо ID
        this.avatarUrl = user.photo_url || 'https://via.placeholder.com/150';
      }

      // Загружаем номер телефона
      const savedPhone = localStorage.getItem('userPhoneNumber');
      if (savedPhone) {
        this.phoneNumber = savedPhone;
      }
    }
  }


  requestPhoneNumber() {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      tg.requestContact((response: any) => {
        console.log("✅ Ответ от Telegram (номер телефона):", response);
  
        if (response && response.result) {
          try {
            // Декодируем URL
            const decoded = decodeURIComponent(response.result);
            console.log("🔍 Декодированный ответ:", decoded);
  
            // Ищем номер телефона
            const match = decoded.match(/"phone_number":"(\d+)"/);
            if (match && match[1]) {
              this.phoneNumber = `+${match[1]}`; // Приводим к стандартному формату +7...
              localStorage.setItem('userPhoneNumber', this.phoneNumber);
              console.log("✅ Номер телефона сохранён:", this.phoneNumber);
            } else {
              console.warn("⚠ Не удалось извлечь номер телефона.");
            }
          } catch (error) {
            console.error("❌ Ошибка обработки ответа:", error);
          }
        } else {
          console.warn("⚠ Пользователь отказался предоставить номер.");
        }
      });
    }
  }
  
  
}
