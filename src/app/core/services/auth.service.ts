import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string; password: string }) {
    console.log("credentials", credentials)
    // Mock login - replace with actual API call
  
      console.log("this.validateCredentials(credentials)", this.validateCredentials(credentials))
      if (this.validateCredentials(credentials)) {
        const user = this.createUserSession(credentials);
        this.router.navigate(['/dashboard'])
      } else {
        console.log('Invalid credentials');
      }

  }

  private validateCredentials(credentials: { email: string; password: string }): boolean {
    return credentials.email === 'admin@example.com' && credentials.password === 'admin';
  }

  private createUserSession(credentials: { email: string }): User {
    const user: User = {
      id: 1,
      name: 'Admin User',
      email: credentials.email,
      role: 'admin'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}