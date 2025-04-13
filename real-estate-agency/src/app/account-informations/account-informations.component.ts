import { Component } from '@angular/core';

@Component({
  selector: 'app-account-informations',
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.css']
})
export class AccountInformationsComponent {
  fullName: string = 'TOUMI ACHREF';
  email: string = "toumiachref52@gmail.com";
  phone: any = 25509768;
  address:any = "avenue de la République, Tunis, Tunisia";
  createdIn: any = "2023-10-01";
  imageUrl: string = 'assets/user.png';
}
