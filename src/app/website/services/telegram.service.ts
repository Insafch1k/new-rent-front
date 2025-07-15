import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  getTelegramId(): number | null {
    const id = localStorage.getItem('telegramId');
    return id ? parseInt(id, 10) : null;
  }

  getPhoneNumber(): string | null {
    return localStorage.getItem('userPhoneNumber');
  }
}
