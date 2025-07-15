import { Component, OnInit } from '@angular/core';
import { MyService } from '../services/my.service';
import { PlashkaData } from '../models/my.model';
import { TelegramService } from 'src/app/website/services/telegram.service'; // Импортируем сервис, если его ещё нет

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {
  plashkaData: PlashkaData[] = [];
  selectedIndex: number | null = null;
  isLoading = false;
  error: string | null = null;
  private telegramId: number = 0; 

  constructor(
    private myService: MyService,
    private telegramService: TelegramService // добавляем сервис
  ) {}

  
  ngOnInit(): void {
    const id = this.telegramService.getTelegramId();
    this.telegramId = id !== null ? id : 0;  // если null, поставить 0
    this.loadUserListings();
  }

  loadUserListings(): void {
    this.isLoading = true;
    this.error = null;
    this.myService.getUserListings(this.telegramId).subscribe({
      next: (data) => {
        this.plashkaData = data;
        this.isLoading = false;
        console.log('Listings loaded:', data);
      },
      error: (err) => {
        this.error = 'Не удалось загрузить объявления';
        this.isLoading = false;
        console.error('Error fetching listings:', err);
      }
    });
  }

  selectPlashka(index: number): void {
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
    } else {
      this.selectedIndex = index;
    }
  }

  deletePlashka(): void {
    if (this.selectedIndex !== null) {
      this.plashkaData.splice(this.selectedIndex, 1);
      this.selectedIndex = null;
    }
  }
}
