import { Component } from '@angular/core';
import { AuthenticationRequest } from 'src/app/services/User-Service/models';

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
    // private authService : AuthService,
     private router: Router,
    // private toastr: ToastrService,
    // private userService: UserService
  ) { }
login() {

}
register() { 
 
}

}
