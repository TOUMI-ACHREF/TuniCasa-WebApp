import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { ProfileService } from '../services/profile.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{

    favorites: any[] = [];
    id: number = 0;
    user: User = {
      id: 0,
      phone: '',
      firstname: '',
      lastname: '',
      role: 'USER',
      email: '',
      imageUrl: ''
    };

    
    constructor(private favoriteService: FavoriteService, private profileService: ProfileService) {}

    ngOnInit() {
      this.profileService.getProfile().subscribe((data: any) => {
        this.user = data;
        this.id = this.user.id; // set the correct user id
        console.log("Fetched user: ", this.user);

        // After getting the correct user ID, fetch favorites
        this.favoriteService.getFavorites(this.id).subscribe((favorites: any) => {
          this.favorites = favorites;
          console.log("User favorites:", this.favorites);
        });
      });
    }

    handleBookmarkChange(estate: any, isBookmarked: boolean): void {
      if(isBookmarked){
        this.favoriteService.removeFavorite(this.user.id, estate.id).subscribe(
          () => {
            console.log(`Estate ${estate.id} removed from favorites.`);
            this.favorites = this.favorites.filter(fav => fav.id !== estate.id); // Optionally, update local favorites state
          },
          (error) => {
            console.error('Error removing favorite:', error);
          }
        );
      }
    }
}
