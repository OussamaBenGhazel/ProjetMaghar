import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/User-Service/models';
import { AuthenticationService } from 'src/app/services/User-Service/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {
    email: '',
    password: '',
    lastname: '',
    firstname: ''
}
errorMsg: Array<string> = [];

constructor(  
  private router: Router,
  private authService: AuthenticationService )
   { }


register() {
  this.errorMsg = [];
  this.authService.register({
    body: this.registerRequest
  }).subscribe({
    next: ()=>{

    }
})


login() {
  this.router.navigate(['login']);

}
}