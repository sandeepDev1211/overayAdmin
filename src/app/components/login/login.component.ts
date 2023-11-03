import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/util/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  constructor(private helperService: HelperService, private router: Router) {
    this.helperService.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
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
  }
}
