import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstateService } from '../services/estates.service';

@Component({
  selector: 'app-estates-information',
  templateUrl: './estates-information.component.html',
  styleUrls: ['./estates-information.component.css']
})
export class EstatesInformationComponent {
  estate: any;

  constructor(
    private route: ActivatedRoute,
    private estateService: EstateService,

  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
  
    if (id !== null && !isNaN(id)) {
      this.estateService.getEstateById(id).subscribe(
        data => {
          this.estate = data;
        },
        error => {
          console.error('Error fetching estate data', error);
        }
      );
      console.log('Fetching estate with ID ', id,': ', this.estate);
    } else {
      console.error('Invalid ID');
    }
  }
}
