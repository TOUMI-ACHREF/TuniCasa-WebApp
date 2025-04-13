import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  estates = [
    { title: 'Villa Sfax', price: '350,000', location: 'Sfax', image: 'assets/building.jpg' ,status: 'sale'},
    { title: 'Appartement Tunis', price: '250,000', location: 'Tunis', image: 'assets/buidings.jpg' ,status: 'rent'},
    { title: 'Maison Sousse', price: '300,000', location: 'Sousse', image: 'assets/buildings.jpg' ,status: 'sale'},
    { title: 'Villa Monastir', price: '400,000', location: 'Monastir', image: 'assets/buildings2.jpg' ,status: 'sale'},
    { title: 'Appartement Bizerte', price: '200,000', location: 'Bizerte', image: 'assets/buidings.jpg' ,status: 'rent'},
    { title: 'Maison Nabeul', price: '280,000', location: 'Nabeul', image: 'assets/buildings2.jpg' ,status: 'sale'},
    { title: 'Villa Sfax', price: '350,000', location: 'Sfax', image: 'assets/buildings.jpg' ,status: 'rent'},
    { title: 'Appartement Tunis', price: '250,000', location: 'Tunis', image: 'assets/buidings.jpg' ,status: 'sale'},
    { title: 'Maison Sousse', price: '300,000', location: 'Sousse', image: 'assets/building.jpg' ,status: 'rent'},
    { title: 'Villa Monastir', price: '400,000', location: 'Monastir', image: 'assets/buildings2.jpg' ,status: 'sale'},
    { title: 'Appartement Bizerte', price: '200,000', location: 'Bizerte', image: 'assets/buidings.jpg' ,status: 'rent'},
    { title: 'Maison Nabeul', price: '280,000', location: 'Nabeul', image: 'assets/buildings2.jpg' ,status: 'sale'},
    ];
}
