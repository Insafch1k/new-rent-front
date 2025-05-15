import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Listing, PlashkaData } from '../models/my.model';
import { API_URL } from 'src/app/website/core/constants';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private districtMap: { [key: number]: string } = {
    1: 'Советский',
    2: 'Навосовинский',
    3: 'Московский',
    4: 'Кировский',
    5: 'Приволжский',
    6: 'Авиостроительный'
  };

  constructor(private http: HttpClient) {}

  getUserListings(userId: number): Observable<PlashkaData[]> {
    return this.http.get<Listing[]>(`${API_URL}/listings`, {
      params: { user_id: userId.toString() }
    }).pipe(
      map(listings => this.transformListingsToPlashkaData(listings))
    );
  }

  private transformListingsToPlashkaData(listings: Listing[]): PlashkaData[] {
    return listings.map(listing => {
      const districtName = listing.district_id ? this.districtMap[listing.district_id] || 'Неизвестный' : 'Неизвестный';
      const district = `${districtName} район`;
      const fullAddress = `Г. Казань, ${district}, ${listing.address}`;
      const createdAt = this.formatRelativeDate(listing.created_at);

      return {
        id: listing.id,
        address: fullAddress,
        price: `${listing.price.toLocaleString('ru-RU')} р. в месяц`,
        description: listing.description,
        imgSrc: listing.photos.length > 0 ? listing.photos[0] : 'assets/images/placeholder.jpg',
        imgPackSrc1: listing.photos.length > 1 ? listing.photos[1] : 'assets/images/placeholder.jpg',
        imgPackSrc2: listing.photos.length > 2 ? listing.photos[2] : 'assets/images/placeholder.jpg',
        created_at: createdAt
      };
    });
  }

  private formatRelativeDate(dateStr: string): string {
    const date = new Date(dateStr); // created_at в GMT
    // Получаем текущее время в MSK (UTC+3)
    const now = new Date();
    const mskOffsetMs = 3 * 60 * 60 * 1000; // Смещение MSK: 3 часа в миллисекундах
    const mskTime = new Date(now.getTime() + (mskOffsetMs - now.getTimezoneOffset() * 60 * 1000));

    const diffMs = mskTime.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs > 0) {
      // Дата в прошлом
      if (diffHours < 24) {
        if (diffHours === 0) {
          return 'Только что';
        }
        return `${diffHours} ${this.getHourDeclension(diffHours)} назад`;
      } else if (diffDays === 1) {
        return 'Вчера';
      } else if (diffDays < 7) {
        return `${diffDays} ${this.getDayDeclension(diffDays)} назад`;
      } else {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${this.getWeekDeclension(weeks)} назад`;
      }
    } else if (diffMs === 0) {
      // Текущий момент
      return 'Только что';
    } else {
      // Дата в будущем
      const absHours = Math.abs(diffHours);
      const absDays = Math.abs(diffDays);
      if (absHours < 24) {
        if (absHours === 0) {
          return 'Сейчас';
        }
        return `Через ${absHours}${this.getHourDeclension(absHours)}`;
      } else if (absDays === 1) {
        return 'Завтра';
      } else if (absDays < 7) {
        return `Через ${absDays}${this.getDayDeclension(absDays)}`;
      } else {
        const weeks = Math.floor(absDays / 7);
        return `Через ${weeks}${this.getWeekDeclension(weeks)}`;
      }
    }
  }

  private getHourDeclension(hours: number): string {
    const lastDigit = hours % 10;
    const lastTwoDigits = hours % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'часов';
    }
    if (lastDigit === 1) {
      return 'час';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'часа';
    }
    return 'часов';
  }

  private getDayDeclension(days: number): string {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'дней';
    }
    if (lastDigit === 1) {
      return 'день';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'дня';
    }
    return 'дней';
  }

  private getWeekDeclension(weeks: number): string {
    return 'н.';
  }
}