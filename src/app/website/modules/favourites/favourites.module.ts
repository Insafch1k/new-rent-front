import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites/favourites.component';




@NgModule({
  declarations: [
    FavouritesComponent
  ],
  imports: [
    CommonModule, FavouritesRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class FavouritesModule{ }
