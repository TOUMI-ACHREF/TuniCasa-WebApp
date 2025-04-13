import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service'; // if needed

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullname: string = '';
  email: string = '';
  password: string = '';
  ConfirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.fullname && this.email && this.password && this.ConfirmPassword) {
      if (this.password !== this.ConfirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      // Optionally, store the user or call an API here
      console.log('Registered:', this.fullname, this.email, this.password);

      // After successful registration, you can redirect to login or home page
      this.router.navigate(['/home']);
    }
  }
}
