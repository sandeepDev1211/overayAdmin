import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  isAdminLoggedIn = new Subject<boolean>();
  constructor() {}

  setLoggedIn(isLogin: boolean | false) {
    this.isAdminLoggedIn.next(isLogin);
  }
}
