import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavoritesService } from '../../favourites/services/favorites.service';
import { FavoriteActionResponse } from '../../favourites/models/favorites.model';

@Component({
  selector: 'app-ad-more-bottom',
  templateUrl: './ad-more-bottom.component.html',
  styleUrls: ['./ad-more-bottom.component.scss']
})
export class AdMoreBottomComponent {
  @Input() listingId!: number;
  @Input() isFavorite!: boolean;
  @Output() favoriteToggled = new EventEmitter<boolean>();
  private tgId = 6049846765;

  constructor(private favoritesService: FavoritesService) {}

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.tgId, this.listingId).subscribe({
        next: (response: FavoriteActionResponse) => {
          this.isFavorite = false;
          this.favoriteToggled.emit(false);
          console.log('Удалено из избранного:', response.message);
        },
        error: (error) => console.error('Ошибка удаления из избранного:', error)
      });
    } else {
      this.favoritesService.addFavorite(this.tgId, this.listingId).subscribe({
        next: (response: FavoriteActionResponse) => {
          this.isFavorite = true;
          this.favoriteToggled.emit(true);
          console.log('Добавлено в избранное:', response.message);
        },
        error: (error) => console.error('Ошибка добавления в избранного:', error)
      });
    }
  }
}