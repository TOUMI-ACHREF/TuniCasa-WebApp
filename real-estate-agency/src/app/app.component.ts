import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
// Testing in git ...
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'real-estate-agency';
  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.authService.autoLogin()
  }
}
