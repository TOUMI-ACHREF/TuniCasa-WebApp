import { Component,OnInit } from '@angular/core';
import { Estate } from 'src/app/models/estate.model';
import { EstateService } from 'src/app/services/estates.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';  // Importation de timer


@Component({
  selector: 'app-estates2',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class Estates2Component implements OnInit {

  estates: Estate[] = [];
  errMess!: string;
  isWaiting: boolean = true;

  constructor(private estateService: EstateService, private router: Router) { }

  ngOnInit(): void {
    this.isWaiting = true;

    this.estateService.getEstates().subscribe({
      next: (estates) => {
        this.estates = estates;

        if (this.estates.length > 0) {
          this.delayHideSpinner(1000);
        } else {
          this.delayHideSpinner(2000); 
        }
      },
      error: (errmess) => {
        this.estates = [];
        this.errMess = errmess;
        this.delayHideSpinner(2000); 
      },
      complete: () => {
        console.log("Complete");
      }
    });
  }

  onEstateDeleted(id: number) {
    this.estates = this.estates.filter(estate => estate.id !== id);
  }

  onAddEstate() {
    this.router.navigateByUrl("/admin/estates/edit/-1");
  }

  // Petite fonction pour éviter de répéter timer
  private delayHideSpinner(duration: number) {
    timer(duration).subscribe(() => {
      this.isWaiting = false;
    });
  }

}