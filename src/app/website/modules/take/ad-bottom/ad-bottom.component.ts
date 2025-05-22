import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FavoritesService } from '../../favourites/services/favorites.service';
import { FavoriteActionResponse } from '../../favourites/models/favorites.model';

@Component({
  selector: 'app-ad-bottom',
  templateUrl: './ad-bottom.component.html',
  styleUrls: ['./ad-bottom.component.scss']
})
export class AdBottomComponent {
  @Input() ad!: { id: number; isFavorite: boolean; [key: string]: any };
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() navigateToAdMore = new EventEmitter<any>();
  private tgId = 6049846765;

  constructor(
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  toggleFavorite(): void {
    console.log('Текущее состояние isFavorite:', this.ad.isFavorite);
    if (this.ad.isFavorite) {
      this.favoritesService.removeFavorite(this.tgId, this.ad.id).subscribe({
        next: (response: FavoriteActionResponse) => {
          this.ad.isFavorite = false;
          this.cdr.detectChanges();
          console.log('После удаления isFavorite:', this.ad.isFavorite);
          console.log('Удалено из избранного:', response.message);
        },
        error: (error) => console.error('Ошибка удаления из избранного:', error)
      });
    } else {
      this.favoritesService.addFavorite(this.tgId, this.ad.id).subscribe({
        next: (response: FavoriteActionResponse) => {
          this.ad.isFavorite = true;
          this.cdr.detectChanges();
          console.log('После добавления isFavorite:', this.ad.isFavorite);
          console.log('Добавлено в избранное:', response.message);
        },
        error: (error) => console.error('Ошибка добавления в избранное:', error)
      });
    }
  }
}