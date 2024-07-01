import { Component, ViewChild } from '@angular/core';
import { HelperService } from './util/helper.service';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Admin_Panel';
  menuIcon = 'menu';
  @ViewChild('sideNav') sideNav: any;

  isLoading = false;
  constructor(private helperService: HelperService, 
    private router: Router, 
    private loginService:LoginService) {
    this.helperService.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  toggleMenu() {
    this.menuIcon === 'menu'
      ? (this.menuIcon = 'close')
      : (this.menuIcon = 'menu');
  }

  navigateToURL(url: string) {
    this.sideNav.close();
    this.toggleMenu();
    this.router.navigateByUrl(url);
  }

  logout(logout: boolean) {
    this.helperService.isLoading.next(true);
    this.loginService.logout();
    setTimeout(() => {
      this.helperService.isLoading.next(false);
      this.navigateToURL('/admin-login');
    }, 1000);
  }
}
