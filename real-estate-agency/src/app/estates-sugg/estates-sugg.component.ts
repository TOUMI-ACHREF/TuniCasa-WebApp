import { Component } from '@angular/core';
import { Estate } from '../models/estate.model';
import { EstateService } from '../services/estates.service';

@Component({
  selector: 'app-estates-sugg',
  templateUrl: './estates-sugg.component.html',
  styleUrls: ['./estates-sugg.component.css']
})
export class EstatesSuggComponent {

  estates: Estate[] = []

  constructor(private estateService: EstateService) {}

  ngOnInit() {
    this.estateService.getSugg().subscribe((data: Estate[]) => {
          this.estates = data;
          console.log(this.estates);
        });
  }
}
