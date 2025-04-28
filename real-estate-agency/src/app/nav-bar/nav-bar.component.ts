import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() selected: string = ''; // Kept for "Contacts" link, but routerLinkActive handles most cases
  isAdmin$: Observable<boolean> | undefined;
  isUser$: Observable<boolean> | undefined;

  isAuthenticated$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin$ = this.authService.AuthenticatedUser$.pipe(
      map(user => user?.role?.name === 'ROLE_ADMIN')
    );
    this.isUser$ = this.authService.AuthenticatedUser$.pipe(
      map(user => user?.role?.name === 'ROLE_USER')
    );
    this.isAuthenticated$ = this.authService.AuthenticatedUser$.pipe(
      map(user => !!user) // True if user exists, false if null/undefined
    );
  }

  scrollToSection(): void {
    const element = document.getElementsByTagName('app-homefooter')[0];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout(): void {
    Swal.fire({
      title: 'Vous éte sur?',
      text: 'Vous allez se déconnecter.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Se déconnecter',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.authService.logout(); // Assuming AuthService has a logout method
        Swal.fire('Déconnexion!', 'Vous éte déconnecter.', 'success');
      }
    });
  }
}
