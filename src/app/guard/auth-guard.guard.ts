import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { LoginServiceService } from '../components/login/login-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {

  // isLoggedIn = false;
  constructor(private login :LoginServiceService,private router: Router) {

  }
  canActivate():boolean{
  if(this.login.isLoggedIn()){
    return true
  }
  else{
    
    this.router.navigate(['/admin-login'])
return false
  }
  }
}
