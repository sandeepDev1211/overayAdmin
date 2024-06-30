import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  
  isLoggedIn = false;
  constructor(private loginService: LoginService,  private router: Router) {
    this.loginService.isAdminLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  canActivate():boolean{
    if(this.loginService.isLoggedIn()){
     return true
    }else{
      this.loginService.logout();
      this.router.navigate(['admin-login']);
      return false
    }
   
  }
}