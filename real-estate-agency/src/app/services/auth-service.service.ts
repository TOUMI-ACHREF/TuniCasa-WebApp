import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = false;
  private authSubject: Subject<boolean> = new Subject<boolean>();
  
  testAccount = {
    email: 'test',
    password: 'test'
  };

  constructor() { }
  
  login(username: string, password: string): boolean {
    if (username === this.testAccount.email && password === this.testAccount.password) {
      this.isAuth = true;
      this.authSubject.next(this.isAuth);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuth = false;
    this.authSubject.next(this.isAuth);
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  // To allow components to subscribe to auth state changes
  getAuthStatus(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
  
}
