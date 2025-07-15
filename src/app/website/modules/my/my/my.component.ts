import { Component, OnInit } from '@angular/core';
import { MyService } from '../services/my.service';
import { PlashkaData } from '../models/my.model';

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
  private readonly telegramId = 825963774; // Тот же ID, что в GiveComponent

  constructor(private myService: MyService) {}

  ngOnInit(): void {
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