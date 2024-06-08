import { Injectable } from '@angular/core';
import {

  CanActivate,
  Router,

} from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {



  constructor(private loginService: LoginService,private router:Router) {


  }
  canActivate():boolean{

    if(this.loginService.isLoggedIn()){
     return true
    }else{
      return false
    }
   
  }
}
