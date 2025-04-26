import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
//import { environment } from '../environments/environment';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent {
  @Input() estate: any;
  
  //to change when the user backend is done
  @Input()
  bookmarked!: boolean;
  @Input() user: any;
  @Output() bookmarkChanged = new EventEmitter<{ estate: any, isBookmarked: boolean }>(); // Emit both estate and bookmark state

  constructor(private favoriteService: FavoriteService) {}

  toggleBookmark(event: Event, estate: any): void {
    event.preventDefault(); // prevent routing when clicking the bookmark
    event.stopPropagation(); // prevent event bubbling to the anchor
  
    this.bookmarked = !this.bookmarked;
  
    // Emit the change to the parent
    this.bookmarkChanged.emit({
      estate: this.estate,
      isBookmarked: this.bookmarked
    });
  }
}
