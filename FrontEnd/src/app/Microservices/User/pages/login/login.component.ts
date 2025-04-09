import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/User-Service/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest = {
    email: '',
    password: '', // Ensure this is a string
  };

  errorMsg: string[] = [];

  constructor(private authService: AuthenticationService, private router: Router) {}

  login(): void {
    this.errorMsg = [];
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (response) => {
        // Handle successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Handle login error
        this.errorMsg.push('Invalid email or password.');
      },
    });
  }
}
