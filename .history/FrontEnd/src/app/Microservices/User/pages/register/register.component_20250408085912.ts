import { Component } from '@angular/core';
import { RegistrationRequest } from 'src/app/services/User-Service/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest

}
