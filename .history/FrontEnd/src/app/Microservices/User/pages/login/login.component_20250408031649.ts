import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/User-Service/models';
import { AuthenticationService } from 'src/app/services/User-Service/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authRequest : AuthenticationRequest = {
    email: '',
    password: ''  };
  errorMsg: Array<string> = [];
 
  constructor(
     private authService : AuthenticationService,
     private router: Router,
    // private toastr: ToastrService,
    // private userService: UserService
  ) { }
login() {
 this.errorMsg = [];
  this.authService.authenticate(
    body:
  )
}
register() { 
 this.router.navigate(['register']);
}

}
