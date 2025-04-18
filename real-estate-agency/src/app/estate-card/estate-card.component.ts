import { Component, Input } from '@angular/core';
//import { environment } from '../environments/environment';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent {
  @Input() estate: any;
  
  //to change when the user backend is done
  bookmarked:boolean = false;

  toggleBookmark(event: Event, estate: any): void {
    event.preventDefault(); // prevent routing when clicking the bookmark
    event.stopPropagation(); // prevent event bubbling to the anchor
  
    this.bookmarked = !this.bookmarked;
  
    // Optional: Send to backend or store locally
    console.log(`${estate.name} bookmarked:`, this.bookmarked);
  }
}
