import { Component } from '@angular/core';
import { Estate } from '../models/estate.model';
import { EstateService } from '../services/estates.service';
import { ProfileService } from '../services/profile.service';
import { FavoriteService } from '../services/favorite.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class EstatesComponent {
  showFilters: boolean = false;
  filters = {
    status: '',
    type: '',
    priceMax: '',
    priceMin: '',
    city: '',
    rooms: ''
  };
  estates: Estate[] = []
  favorites: Estate[] = []

  user: User={
      id: 0,
      phone: '',
      firstname: '',
      lastname: '',
      role:'USER',
      email: '',
      imageUrl:''
    };
    id:number=0;
  
  constructor(private estateService: EstateService, private profileService: ProfileService, private favoriteService:FavoriteService) {}

  ngOnInit() {
    this.estateService.getEstates().subscribe((data: Estate[]) => {
      this.estates = data;
      console.log(this.estates);
    });

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

  /* loadUserFavorites(): void {
    // Optionally load favorites here for initial state (optional if you fetch favorites from the backend)
    this.favoriteService.getFavorites(this.user.id).subscribe(
      (favorites) => {
        this.favorites = favorites;
        console.log(this.favorites);
      },
      (error) => {
        console.error('Error loading favorites:', error);
      }
    );
  } */

  // Method to check if an estate is in the favorites list
  isFavorite(estate: any): boolean {
    return this.favorites.some(fav => fav.id === estate.id);
  }
    
  //pour le filtrage
  applyFilters(filters: any) {
    if (filters.priceMax === null) {
      filters.priceMax = '';
    }
    if (filters.priceMin === null) {
      filters.priceMin = '';
    }
    this.estateService.getFilteredEstates(filters).subscribe((data: Estate[]) => {
      this.estates = data;
      console.log(this.estates);
    });
  }

  handleBookmarkChange(estate: any, isBookmarked: boolean): void {
    // Handle bookmarking action from child (EstateCardComponent)
    if (isBookmarked) {
      this.favoriteService.addFavorite(this.user.id,estate.id).subscribe(
        () => {
          console.log(`Estate ${estate.id} added to favorites.`);
          this.favorites.push(estate); // Optionally, update the local state for the favorites list
        },
        (error) => {
          console.error('Error adding favorite:', error);
        }
      );
    } else {
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

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
