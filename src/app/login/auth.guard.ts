import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router) {}

  
  canActivate() {
    console.log('in can activate')

    if (AuthService.isTokenExpired() != true) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}