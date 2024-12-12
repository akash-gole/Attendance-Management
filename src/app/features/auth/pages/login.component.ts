import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <div class="login-container">
      <app-login-form (loginSuccess)="onLoginSuccess()"></app-login-form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
  `]
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLoginSuccess(): void {
    this.router.navigate(['/dashboard']);
  }
}