// register.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.email, this.password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Registration failed';
        }
      },
      (error) => {
        this.errorMessage = 'Registration failed';
      }
    );
  }
}

