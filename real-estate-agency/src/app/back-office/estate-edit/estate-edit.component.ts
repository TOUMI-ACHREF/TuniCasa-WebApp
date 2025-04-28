import { Component,Inject, OnInit  } from '@angular/core';
import { Estate  } from 'src/app/models/estate.model';
import { EstateService } from 'src/app/services/estates.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { EstateStatus  } from 'src/app/models/estate-status.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estate-edit',
  templateUrl: './estate-edit.component.html',
  styleUrls: ['./estate-edit.component.css']
})
export class EstateEditComponent implements OnInit{

  estate!: Estate;
  isLoading = false;

  estateStatuses: EstateStatus[] = Object.values(EstateStatus);

  // upload file
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
    private estateService: EstateService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') public baseUrl: string
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== '-1') {
        this.initEstate(+id);
      } else {
        
        // création d'un nouvel Estate
        this.estate = {
          name: '',
          type: '',
          status: null!,      // à remplir via select
          description: '',
          price: 0,
          surface: 0,
          city: '',
          address: '',
          imageUrl: '',
          rooms: 0,
          bathrooms: 0,
          datePosted: new Date().toISOString().substr(0,10),     // yyyy-MM-dd
          availableFrom: new Date().toISOString().substr(0,10),
          ownerName: '',
          contactPhone: ''
        };
      }
    });
  }

  private initEstate(id: number): void {
    this.estateService.getEstateById(id).subscribe({
      next: est => {
        this.estate = est;
      },
      error: err => {
        console.error('Error loading estate', err);
      }
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    this.isLoading = true;
    Swal.fire({
      title: 'immobiliere',
      text: this.estate.id? `Confirmer les modification`:`Confirmer l'ajout`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        // Simuler un délai pour l'UI
        setTimeout(() => {
          const op$ = this.estate.id
            ? this.estateService.updateEstate(this.estate)
            : this.estateService.addEstate(this.estate);

          op$.subscribe({
            next: (saved: Estate) => {
              this.estate = saved;
              this.uploadImage(saved.id!);
              this.isLoading = false;
              this.progress=0;
              this.router.navigate(['/home']);
              
            },
            error: err => {
              console.error('Save error', err);
              this.isLoading = false;
            }
          });
        }, 500);

        Swal.fire('Modification avec Succée!', 'Les données sont bien modifier.', 'success');
      }
    });
    
  }

  private uploadImage(estateId: number): void {
    this.progress = 0;
    if (!this.selectedFiles) {
      // pas d'image : retour à la liste ou détail
      this.finishAndNavigate(estateId);
      return;
    }

    const file = this.selectedFiles.item(0);
    if (!file) {
      this.finishAndNavigate(estateId);
      return;
    }

    this.currentFile = file;
    this.fileUploadService.uploadEstate(this.currentFile, estateId)
      .subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / (event.total ?? 1));
          } else if (event instanceof HttpResponse) {
            this.message = event.body?.message ?? 'Upload successful';
            this.finishAndNavigate(estateId);
          }
        },
        error: err => {
          console.error('Upload error', err);
          this.message = err.error?.message ?? 'Could not upload image';
          this.isLoading = false;
        }
      });
  }

  private finishAndNavigate(id: number): void {
    this.isLoading = false;
    this.router.navigateByUrl(`/admin/estates/${id}`);  // ou liste: '/estates'
  }

  onCancel(): void {
    this.router.navigateByUrl('/admin/estates');
  }
}