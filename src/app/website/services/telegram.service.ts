import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  getTelegramId(): number | null {
    const id = localStorage.getItem('telegramId');
    console.log('localStorage telegramId:', id);
    return id ? parseInt(id, 10) : null;
  }

  getPhoneNumber(): string | null {
    return localStorage.getItem('userPhoneNumber');
  }
}
