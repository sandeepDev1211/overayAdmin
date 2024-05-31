import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/util/helper.service';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

credentials={
  email: '',
  password: ''
} 
  router: any;

constructor(private loginService:LoginServiceService){}

ngOnInit(): void {
  
}
  // loginForm!: FormGroup;
  isLoading = false;

  // constructor(private helperService: HelperService, private router: Router) {
  //   this.helperService.isLoading.subscribe((isLoading: boolean) => {
  //     this.isLoading = isLoading;
  //   });
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required]),
  //   });
  // }

  // generateToken(credentials:any){

  //   return this.http.post(`${this.url}/token`,credentials)

  // }


  onSubmit(){
   console.log('form is submitted');
  if((this.credentials.email!='' && this.credentials.password!='') &&(this.credentials.email!=null && this.credentials.password!=null)){

  this.loginService.generateToken(this.credentials).subscribe(
    (response:any)=>{
console.log(response);
this.loginService.loginUser(response.token)
this.router.navigateByUrl('/dashboard');

    },
    error=>{
console.log(error);

    }
    )
    
    

  }else{
    console.log('Fields are empty');
    
  }

  }



  // login() {
  //   this.helperService.openLoader(true);
  //   setTimeout(() => {
  //     this.helperService.openLoader();

  //     this.helperService.openMessageDialog(
  //       true,
  //       'Success',
  //       'Logged In Successfully'
  //     );
  //     setTimeout(() => {
  //       this.helperService.closeDialog();
  //       this.router.navigateByUrl('/dashboard');
  //     }, 3000);
  //   }, 2000);
  // }
}
