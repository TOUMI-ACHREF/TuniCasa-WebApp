import { Component, Input } from '@angular/core';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent {
  @Input() estate: any;
  
}
