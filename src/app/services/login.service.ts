import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // static getToken() {
  //   throw new Error('Method not implemented.');
  // }

url='https://www.shop.overay.in/v1/auth/login'

  isAdminLoggedIn = new Subject<boolean>();


  constructor(private http:HttpClient) {}

  generateToken(credentials:any){

    return this.http.post(`${this.url}`,credentials)

  }

  loginUser(token: string){
    localStorage.setItem('token',token)
    return true
    }

    isLoggedIn():boolean{
    return !! localStorage.getItem('token')
    }

    logout(){
      localStorage.clear();
      return true;
    }

    getToken(): string | null{
      return localStorage.getItem('token')
    }

  setLoggedIn(isLogin: boolean | false) {
    this.isAdminLoggedIn.next(isLogin);
  }
}
