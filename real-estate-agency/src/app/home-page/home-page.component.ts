import { Component } from '@angular/core';
import { EstateService } from '../services/estates.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  searchResults: any[] = [];

  constructor(private estatesService: EstateService) {}

  onSearch(searchTerm: string) {
    this.estatesService.searchEstates(searchTerm).subscribe(data => {
      this.searchResults = data;  // Store the results from the service
    }); 
  }
}
