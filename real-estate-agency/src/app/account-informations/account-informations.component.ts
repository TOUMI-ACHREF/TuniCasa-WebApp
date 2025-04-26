import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-informations',
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.css']
})
export class AccountInformationsComponent {
  /*
    fullName: string = 'TOUMI ACHREF';
    email: string = "toumiachref52@gmail.com";
    phone: any = 25509768;
    address:any = "avenue de la République, Tunis, Tunisia";
    createdIn: any = "2023-10-01";
    imageUrl: string = 'assets/user.png';
  */
  user: User={
    id: 0,
    phone: '',
    firstname: '',
    lastname: '',
    role:'USER',
    email: '',
    imageUrl:''
  };
  errorSupp:string ='';
  errorUpdate:string ='';

  show:boolean = false;

  /* upload file*/ 
  selectedFiles?: FileList; 
  currentFile?: File; 
  progress = 0; 
  message = ''; 

  /* Reference to the file input element */
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseUrl: string
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
    });

    
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
    console.log("!--User Deconnected");
  }

  onUpdate(): void {
    this.profileService.updateProfile(this.user).subscribe({
      next: (updated) => {
        console.log('Profile updated', updated);
        alert('Profile updated!');
      },
      error: err => {
        // On error, set the error message and log it to the console 
        this.errorUpdate = err;
      } 
    });
  }

  onDelete(): void {
    if (confirm('Vous éte sure supprimer votre compte?')) {
      this.profileService.deleteProfile(this.user.id).subscribe({
        next: () => {
          console.log('Profile deleted');
          alert('Votre compte est supprimer.');
          this.router.navigate(['/']);
          this.authService.logout();
        },
        error: err => {
          // On error, set the error message and log it to the console 
          this.errorSupp = err;
        } 
      });
    }
  }


  /** Triggers the hidden file input when the image is clicked */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /** Handles file selection and initiates the upload */
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      this.currentFile = this.selectedFiles[0];
      this.upload();
    }
  }

  /** Uploads the selected file using FileUploadService */
  upload(): void {
    if (!this.user.id) {
      this.message = 'User ID not found';
      return;
    }
    if (this.currentFile) {
      this.fileUploadService.upload(this.currentFile, this.user.id).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            // Refresh user data after successful upload
            this.profileService.getProfile().subscribe((data: any) => {
              this.user = data;
              this.message = 'Image uploaded successfully';
            });
          }
        },
        error: (err: any) => {
          this.message = 'Could not upload the file: ' + err.message;
          this.currentFile = undefined;
        }
      });
    }
  }


}
