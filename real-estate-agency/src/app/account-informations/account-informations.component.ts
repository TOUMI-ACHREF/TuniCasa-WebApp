import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-informations',
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.css']
})
export class AccountInformationsComponent {
  user: User = {
    id: 0,
    phone: '',
    firstname: '',
    lastname: '',
    role: 'USER',
    email: '',
    imageUrl: ''
  };
  errorSupp: string = '';
  errorUpdate: string = '';
  show: boolean = false;

  // Upload file properties
  selectedFiles: FileList | null = null;
  currentFile: File | null = null;
  progress: number = 0;
  message: string = '';

  // Reference to the file input element
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseUrl: string
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data: User) => {
        this.user = data;
        console.log('User data loaded:', this.user);
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.message = 'Failed to load user profile';
      }
    });
  }

  logout(): void {
      Swal.fire({
        title: 'Vous éte sur?',
        text: 'Vous allez déconnecter.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, Se déconnecte',
        cancelButtonText: 'Annuler'
      }).then(result => {
        if (result.isConfirmed) {
          this.authService.logout(); // Assuming AuthService has a logout method
          this.user = { id: 0, phone: '', firstname: '', lastname: '', role: 'USER', email: '', imageUrl: '' };
          Swal.fire('déconnection!', 'Vous éte déconnecter.', 'success');
        }
      });
    }
  /* logout(): void {
    this.authService.logout();
    this.user = { id: 0, phone: '', firstname: '', lastname: '', role: 'USER', email: '', imageUrl: '' };
    this.router.navigate(['/']);
    console.log('User disconnected');
  } */

  onUpdate(): void {
    if (!this.user.id) {
      this.errorUpdate = 'User ID is missing';
      console.error('User ID missing:', this.user);
      return;
    }
    this.profileService.updateProfile(this.user).subscribe({
      next: (updated) => {
        console.log('Profile updated:', updated);
        this.errorUpdate = '';
        this.show = false;
        alert('Profile updated!');
      },
      error: (err) => {
        this.errorUpdate = err.message || 'Failed to update profile';
        console.error('Update error:', err);
      }
    });
  }

  onDelete(): void {
    if (!this.user.id) {
      this.errorSupp = 'User ID is missing';
      console.error('User ID missing:', this.user);
      return;
    }
    if (confirm('Vous êtes sûr de vouloir supprimer votre compte ?')) {
      this.profileService.deleteProfile(this.user.id).subscribe({
        next: () => {
          console.log('Profile deleted');
          alert('Votre compte a été supprimé.');
          this.authService.logout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorSupp = err.message || 'Failed to delete account';
          console.error('Delete error:', err);
        }
      });
    }
  }

  /** Triggers the hidden file input when the image is clicked */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /** Handles file selection and initiates the upload */
  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files;
    console.log('Selected files:', this.selectedFiles);

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.currentFile = this.selectedFiles[0];
      console.log('Current file:', this.currentFile);
      this.upload();
    } else {
      this.message = 'No file selected';
      console.error('No file selected');
    }
  }

  /** Uploads the selected file using FileUploadService */
  upload(): void {
    if (!this.user.id) {
      this.message = 'User ID not found';
      console.error('User ID not found:', this.user.id);
      return;
    }
    if (!this.currentFile) {
      this.message = 'No file to upload';
      console.error('No file to upload');
      return;
    }

    console.log('Uploading file:', this.currentFile.name, 'for user ID:', this.user.id);

    this.fileUploadService.upload(this.currentFile, this.user.id).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          console.log('Upload progress:', this.progress);
        } else if (event instanceof HttpResponse) {
          console.log('Upload response:', event.body);
          // Refresh user data after successful upload
          this.profileService.getProfile().subscribe({
            next: (data: User) => {
              this.user = data;
              this.message = 'Image uploaded successfully';
              this.currentFile = null;
              this.selectedFiles = null;
              this.fileInput.nativeElement.value = ''; // Reset file input
            },
            error: (err) => {
              this.message = 'Failed to refresh user data: ' + err.message;
              console.error('Profile refresh error:', err);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Upload error:', err);
        this.message = `Could not upload the file: ${err.message || err.error?.message || 'Unknown error'}`;
        this.currentFile = null;
        this.selectedFiles = null;
        this.fileInput.nativeElement.value = ''; // Reset file input
      }
    });
  }
}