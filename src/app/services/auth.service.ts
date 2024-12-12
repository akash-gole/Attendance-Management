import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    // Mock login - replace with actual API call
    return new Observable(subscriber => {
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
        const user = {
          id: 1,
          name: 'Admin User',
          email: credentials.email,
          role: 'admin'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        subscriber.next(true);
      } else {
        subscriber.error('Invalid credentials');
      }
      subscriber.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}