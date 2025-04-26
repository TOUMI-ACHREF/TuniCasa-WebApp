import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

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

  constructor(private profileService: ProfileService,private authService: AuthService,private router: Router) {}

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
}
