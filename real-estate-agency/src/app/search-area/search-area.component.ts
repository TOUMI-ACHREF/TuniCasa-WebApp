import { Component, EventEmitter, Output } from '@angular/core';
import { EstateService } from '../services/estates.service';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent {
  @Output() searchEvent = new EventEmitter<string>();  // EventEmitter to emit search term

  searchTerm: string = '';

  onSearch() {
    if (this.searchTerm.trim()) {
      this.searchEvent.emit(this.searchTerm);  // Emit the search term
      this.searchTerm = ''; //Vider le contenu de zone de recherche
    
    }
  }
}
