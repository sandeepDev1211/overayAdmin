import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/util/helper.service';
import { LoginServiceService } from './login-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: '',
  }

  loginForm!: FormGroup;
  isLoading = false;
  constructor(private helperService: HelperService, private router: Router, private fb: FormBuilder, private login: LoginServiceService, private toastr: ToastrService) {

    this.helperService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }


  ngOnInit() {
    // this.loginForm = this.fb.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
  }

  adminLogin() {

    if ((this.credentials.email != '' && this.credentials.password != '') && (this.credentials.email != null && this.credentials.password != null)) {
      this.login.generateToken(this.credentials).subscribe(
        (response: any) => {
          console.log(response.token);
          this.login.loginUser(response.token)
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          console.log(error);

        }
      )

    }
    else {
      this.toastr.error('Fields are empty');

    }
  }

}
