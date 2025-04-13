import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  isAuth: boolean = false;
  email: string = '';
  password: string = '';
  

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe({
      next: (isAuthenticated: boolean) => {
        this.isAuth = isAuthenticated;
      }
    });
  }

  login(): void {
    const success = this.authService.login(this.email, this.password);
    if (!success) {
      alert('Invalid credentials');
      this.email = '';
      this.password = '';
    }else {
      alert('Login successful');
      this.router.navigate(['/home']);
      this.email = '';
      this.password = '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.email= '';
    this.password= '';
  }
}