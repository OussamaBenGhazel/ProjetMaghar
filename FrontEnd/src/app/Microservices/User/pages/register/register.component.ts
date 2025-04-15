import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/User-Service/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '', // Ensure all properties are strings
  };

  errorMsg: string[] = [];

  constructor(private authService: AuthenticationService, private router: Router) {}

  register(): void {
    this.errorMsg = [];
    this.authService.register({ body: this.registerRequest }).subscribe({
      next: (response) => {
        // Handle successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // Handle registration error
        this.errorMsg.push('Registration failed. Please try again.');
      },
    });
  }
}