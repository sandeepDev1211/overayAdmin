import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HelperService } from 'src/app/util/helper.service';
import { LoginServiceService } from './login-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  credentials={
    email: '',
    password: '',
  } 
  

  isLoading = false;
  constructor(private helperService: HelperService, private router: Router, private login:LoginService) {
    this.helperService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }





  adminLogin() {


// console.log('form is submitted');
if((this.credentials.email!='' && this.credentials.password!='') &&(this.credentials.email!=null && this.credentials.password!=null))
  {
    this.login.generateToken(this.credentials).subscribe(
      (response:any)=>{
    console.log(response.token);
    this.login.loginUser(response.token)
    this.helperService.openLoader(true);
    setTimeout(() => {
      this.helperService.openLoader();

      this.helperService.openMessageDialog(
        true,
        'Success',
        'Logged In Successfully'
      );
      setTimeout(() => {
        this.helperService.closeDialog();
        this.router.navigateByUrl('/dashboard');
      }, 3000);
    }, 2000);
      },
      error=>{
    console.log(error);
    
      }
      )
}
else{
  console.log('fields are empty');
  
}


  }


}
