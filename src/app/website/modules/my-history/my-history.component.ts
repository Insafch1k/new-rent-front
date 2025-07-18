import { Component, OnInit } from '@angular/core';
import { HistoryService } from './services/history.service';
import { HistoryResponse, Listing } from './models/history.model';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss']
})
export class MyHistoryComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.getHistory().subscribe({
      next: (response: any) => {
        this.listings = response.listings.map((item: any) => item.listing);
      },
      error: (error) => {
        console.error('Ошибка при загрузке истории:', error);
      }
    });
  }
}