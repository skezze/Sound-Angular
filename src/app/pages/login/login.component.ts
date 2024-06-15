import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
