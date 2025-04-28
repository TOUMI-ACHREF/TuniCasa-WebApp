import { Component, EventEmitter, Inject, Input, Output  } from '@angular/core';
import { Estate } from 'src/app/models/estate.model';
import { EstateService } from 'src/app/services/estates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estate-details',
  templateUrl: './estate-details.component.html',
  styleUrls: ['./estate-details.component.css']
})
export class EstateDetailsComponent {

  @Input() estate!: Estate;
  //Quand tu supprimes un estate, tu émets son id vers le parent pour le retirer de la liste.
  @Output() estateDeleted: EventEmitter<number> = new EventEmitter<number>();
  isLoading: boolean = false;
  public constructor(private estateService: EstateService,
    @Inject('BaseURL') public baseUrl: string) { }
    
    
    deleteEstate(id: number) {
     // const confirmDelete = window.confirm('Are you sure you want to delete this estate?');
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this Estate!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // lancer la suppression
        this.isLoading = true; // Affiche le spinner
    
        this.estateService.deleteEsate(id).subscribe({
          next: () => {
            setTimeout(() => {
              this.isLoading = false;
              this.estateDeleted.emit(id);
            }, 1000); // 1 seconde de délai pour laisser le temps de voir le spinner
          },
          error: () => {
            console.log("Error deleting estate.");
            this.isLoading = false;
          }
        });
      }
    });
    
        
      }


}