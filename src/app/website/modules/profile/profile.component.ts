import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { User } from './models/user.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  loading = true;
  error: string | null = null;
  user: User | null = null;
  avatarUrl: string | SafeUrl = 'https://e7.pngegg.com/pngimages/524/597/png-clipart-exotel-cloud-communications-privacy-policy-interactive-voice-response-information-others-miscellaneous-blue.png';
  username: string = 'Гость'; // Имя пользователя
  userId: string = 'Нет юзернейма'; // Юзернейм вместо ID
  phoneNumber: string = 'Номер не доступен';

  constructor(
    private profileService: ProfileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  private formatPhoneNumber(phone: string): string {
    // Убираем все нецифровые символы
    const cleaned = phone.replace(/\D/g, '');
    
    // Убираем +7 или 8 в начале, если есть
    const numbers = cleaned.replace(/^(7|8)/, '');
    
    // Проверяем длину
    if (numbers.length !== 10) {
      return phone; // Возвращаем исходный номер, если формат неверный
    }
    
    // Форматируем номер
    return `+7 (${numbers.slice(0,3)}) ${numbers.slice(3,6)}-${numbers.slice(6,8)}-${numbers.slice(8)}`;
  }

  private loadProfile() {
    this.loading = true;
    this.error = null;

    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.user = response.user;
        this.loading = false;
        if (this.user) {
          this.username = this.user.username || 'Гость';
          this.userId = `@${this.user.username}`;
          this.phoneNumber = this.user.phone ? this.formatPhoneNumber(this.user.phone) : 'Номер не доступен';
          
          // Обработка аватарки в формате base64
          if (this.user.photo) {
            // Если фото уже содержит префикс data:image, используем как есть
            if (this.user.photo.startsWith('data:image')) {
              this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(this.user.photo);
            } else {
              // Иначе добавляем префикс
              this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${this.user.photo}`);
            }
          } else {
            this.avatarUrl = 'https://e7.pngegg.com/pngimages/524/597/png-clipart-exotel-cloud-communications-privacy-policy-interactive-voice-response-information-others-miscellaneous-blue.png';
          }
        }
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке профиля';
        this.loading = false;
        console.error('Ошибка при загрузке профиля:', err);
      }
    });
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
              this.phoneNumber = this.formatPhoneNumber(match[1]);
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
