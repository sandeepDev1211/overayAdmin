import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import ValidateForm from 'src/app/message-dialog/validateForm';
import { HelperService } from 'src/app/util/helper.service';
import { LoginServiceService } from './login-service.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  constructor(private helperService: HelperService, private router: Router,private fb: FormBuilder,private login:LoginServiceService) {

    this.helperService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {

    if (this.loginForm.valid) {


console.log(this.loginForm.value);



this.login.generateToken(this.loginForm.value).subscribe(
  (response:any)=>{
console.log(response);
this.login.loginUser(response.token)
// this.router.navigateByUrl('/dashboard');
window.location.href="/dashboard"
  },
  error=>{
console.log(error);

  }
  )
  
  

}else{
  console.log('Fields are empty');
  
}


    }



    // this.helperService.openLoader(true);
    // setTimeout(() => {
    //   this.helperService.openLoader();

    //   this.helperService.openMessageDialog(
    //     true,
    //     'Success',
    //     'Logged In Successfully'
    //   );
    //   setTimeout(() => {
    //     this.helperService.closeDialog();
    //     this.router.navigateByUrl('/dashboard');
    //   }, 3000);
    // }, 2000);
  }
