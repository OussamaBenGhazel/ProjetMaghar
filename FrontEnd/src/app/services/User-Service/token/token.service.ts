import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }
  
  get token(): string {
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }


 private isTokenValid(): boolean {
  const token: string = this.token;
  if (!token) {
    return false;
  }
  //decode token
  const jwtHelper = new JwtHelperService();
  const isTokenExpired = jwtHelper.isTokenExpired(token);
  if (isTokenExpired) {
    localStorage.clear();
    return false;
  }
  return true;
  }
}
