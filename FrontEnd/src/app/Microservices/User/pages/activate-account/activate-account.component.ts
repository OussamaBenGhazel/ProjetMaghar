import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/User-Service/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent {


  message: string ='';
  isOkay: boolean = true;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  onCodeCompleted(code: string): void {
    this.confirmAccount(code); // Pass the completed code to confirmAccount
  }

  redirectToLogin(){
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string): void {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message ='Your account has been activated successfully.\nNow you can proceed to login.';
        this.submitted = true;
        this.isOkay = true;
  },
  error: () => {
    this.message ='Token has been expired or invalid.\nPlease try again.';
    this.submitted = true;
    this.isOkay = false; 
  }
    });
  }
}
