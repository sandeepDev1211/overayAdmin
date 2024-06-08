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

url='http://localhost:5000/v1/auth/login'

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
      localStorage.removeItem('token')
      return true
    }

    getToken(){
      return localStorage.getItem('token')
    }

  setLoggedIn(isLogin: boolean | false) {
    this.isAdminLoggedIn.next(isLogin);
  }
}
