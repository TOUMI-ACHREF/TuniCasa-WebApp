import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { User } from 'src/app/models/user.model';
import { RegisterUser } from 'src/app/Shared/register-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent  implements OnInit{

  user!: User;
  registerUser: RegisterUser={
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'ROLE_USER' // Default role, adjust as needed
  };
  _password:string='';
  //Variable to track loading state
  isLoading: boolean = false;
  //Variable for message duplicated email
  errMail: string = "";
  isDisabled:boolean =true;
  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseUrl: string) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (resutl) => {
        let id = resutl.get('id')
        //Update
        if (id != "-1") this.initUser(id);
        //else this.user = new User(null,"",null);
      }
    )
  }

  
  initUser(id: any) {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.log("error")
    })
  }
  
  onSubmit() {
    // Convertir projects en tableau de chaîne de caractères
    
    this.isLoading = true; // Active le spinner
  
    // Simuler un délai supplémentaire avant d'envoyer les données
    setTimeout(() => {
      // Ajoutez ici votre logique de soumission
      if (this.user.id == null) {
        // Si c'est un nouvel ajout, obtenir le dernier contact pour calculer l'ID
        this.userService.getLastUser().subscribe((lastuser) => {
          const lastuserId = lastuser ? +lastuser.id : 0;  // Convertir l'ID en nombre avec '+'
          this.user.id = (lastuserId + 1);  // Générer un ID incrémenté
      
          //creation d'un registerUser
          this.registerUser = {
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            password: this._password,
            role: this.user.role // Default role, adjust as needed
          };          

          this.authService.register(this.registerUser).subscribe({
            next: (user: RegisterUser) => {
              this.errMail = "";
              //this.upload(user); // Appeler la fonction d'upload de fichier après l'ajout du contact
              this.isLoading = false; // Désactiver le spinner en cas de succée

            },
            error: (err) => {
              console.log("error: " + err.message);
              this.errMail = err.message;
              this.isLoading = false; // Désactiver le spinner en cas d'erreur
            }
          });
        });
      } else {
        this.userService.updateUser(this.user)
          .subscribe({
            next: (user: User) => {
              this.errMail = "";
              this.upload(user);
            },
            error: (err) => {
              this.errMail = err.message;
              this.isLoading = false; // Désactiver le spinner
            }
          });
      }
    }, 1000);  // Ajoutez un délai artificiel de 1000 ms (1 seconde) avant de procéder
  }
  
  onUsers() {
    this.router.navigateByUrl('/admin/users')
  }

  /*upload file*/
  selectFile(event: any): void {
    // This function is called when a file is selected by the user
    // It assigns the selected file(s) to the selectedFiles property
    this.selectedFiles = event.target.files;
  }

  upload(user: User): void {
    // This function uploads the selected file(s) to the server

    // Reset progress to 0 at the beginning of the upload
    this.progress = 0;

    // Check if there are selected files
    if (this.selectedFiles) {
      // Get the first selected file
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        // Assign the current file being uploaded
        this.currentFile = file;

        // Upload the file using the fileUploadService
        this.fileUploadService.upload(this.currentFile, user.id).subscribe({
          next: (event: any) => {
            // Progress event: Update progress bar
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            // Response event: Handle successful upload
            else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // Redirect to contact details page after successful upload
              this.router.navigateByUrl('/admin/users/' + user.id);
              this.isLoading = false; //Desactiver le spinner
            }
          },
          error: (err: any) => {
            // Handle error
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      } else {
        // Reset selectedFiles if no file is selected
        this.selectedFiles = undefined;
        // Redirect to contact details page
        this.router.navigateByUrl('/admin/users/' + user.id);
        this.isLoading = false; //Desactiver le spinner
      }
    } else {
      // Redirect to contact details page 
      this.router.navigateByUrl('/admin/users/' + user.id);
      this.isLoading = false; //Desactiver le spinner
    }
  }


}