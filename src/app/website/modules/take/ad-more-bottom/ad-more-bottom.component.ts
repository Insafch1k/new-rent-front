import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { FavoritesService } from '../../favourites/services/favorites.service';
import { FavoriteActionResponse } from '../../favourites/models/favorites.model';
import { Listing } from '../services/preference.service'; // путь такой же, как в ad-more.component.ts

@Component({
  selector: 'app-ad-more-bottom',
  templateUrl: './ad-more-bottom.component.html',
  styleUrls: ['./ad-more-bottom.component.scss']
})
export class AdMoreBottomComponent implements OnInit {
  @Input() listing!: Listing | null;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggled = new EventEmitter<boolean>();
  @Output() toggleFavoriteClicked = new EventEmitter<void>();
  private tgId = 825963774;

  constructor(
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  
  ngOnInit(): void {
    this.favoritesService.getFavoriteIds().subscribe(favoriteIds => {
      this.isFavorite = this.listing ? favoriteIds.has(this.listing.id) : false;
      this.cdr.detectChanges();
    });
  }

  toggleFavorite(): void {
    if (!this.listing) return;
  
    const listingId = this.listing.id;
  
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.tgId, listingId).subscribe(() => {
        this.isFavorite = false;
        this.favoriteToggled.emit(this.isFavorite);
        this.cdr.detectChanges();
      });
    } else {
      this.favoritesService.addFavorite(this.tgId, listingId).subscribe(() => {
        this.isFavorite = true;
        this.favoriteToggled.emit(this.isFavorite);
        this.cdr.detectChanges();
      });
    }
  }
  
  
}