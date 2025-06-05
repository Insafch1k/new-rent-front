import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { FavoritesService } from '../../favourites/services/favorites.service';
import { FavoriteActionResponse } from '../../favourites/models/favorites.model';

@Component({
  selector: 'app-ad-more-bottom',
  templateUrl: './ad-more-bottom.component.html',
  styleUrls: ['./ad-more-bottom.component.scss']
})
export class AdMoreBottomComponent implements OnInit {
  @Input() listingId!: number;
  @Input() isFavorite!: boolean;
  @Output() favoriteToggled = new EventEmitter<boolean>();
  private tgId = 6049846765;

  constructor(
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.favoritesService.getFavoriteIds().subscribe(favoriteIds => {
      this.isFavorite = favoriteIds.has(this.listingId);
      this.cdr.detectChanges();
    });
  }

  toggleFavorite(): void {
    console.log('Начало toggleFavorite, listingId:', this.listingId, 'isFavorite:', this.isFavorite, 'tgId:', this.tgId);
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.tgId, this.listingId).subscribe({
        next: (response: FavoriteActionResponse) => {
          console.log('Успешно удалено:', response);
          this.isFavorite = false;
          this.favoriteToggled.emit(false);
          this.cdr.detectChanges();
          console.log('После удаления isFavorite:', this.isFavorite);
        },
        error: (error) => {
          console.error('Ошибка удаления:', error);
        },
        complete: () => console.log('Запрос удаления завершён')
      });
    } else {
      this.favoritesService.addFavorite(this.tgId, this.listingId).subscribe({
        next: (response: FavoriteActionResponse) => {
          console.log('Успешно добавлено:', response);
          this.isFavorite = true;
          this.favoriteToggled.emit(true);
          this.cdr.detectChanges();
          console.log('После добавления isFavorite:', this.isFavorite);
        },
        error: (error) => {
          console.error('Ошибка добавления:', error);
        },
        complete: () => console.log('Запрос добавления завершён')
      });
    }
  }
}