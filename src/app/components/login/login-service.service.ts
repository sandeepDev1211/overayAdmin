import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

url="http://localhost:5000/v1/auth/login"

  constructor(private http: HttpClient) { }

  generateToken(credentials: any) {
    return this.http.post(`${this.url}`, credentials)
  }

  // storeToken(tokenValue: string){
  //   localStorage.setItem('token', tokenValue)
  // }

  loginUser(token: string) {
    localStorage.setItem('token', token)
    return true
  }

  getToken() {
    return localStorage.getItem('token')
  }

  // isLoggedIn(): boolean {
  //   const token = localStorage.getItem('token');
  //   return !!token; 
  // }
}










// loginUser(token: string){
// localStorage.setItem('token',token)
// return true
// }

// isLoggedIn(){
//   let token = localStorage.getItem('token');
//   if(token == undefined || token === '' || token==null){
// return false
//   }else{
//     return true
//   }
// }

// logout(){
//   localStorage.removeItem('token')
//   return true
// }

// getToken(){
//   return localStorage.getItem('token')
// }



