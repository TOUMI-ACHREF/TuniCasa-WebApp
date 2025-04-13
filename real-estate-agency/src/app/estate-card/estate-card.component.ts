import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent {
  @Input() estate: any;
  
}
