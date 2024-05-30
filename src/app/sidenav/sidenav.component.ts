import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HelperService } from '../util/helper.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  routeChangeSubscription;
  constructor(private router: Router) {
    this.routeChangeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
        console.log(this.activeRoute);
      }
    }); 
  }
  activeRoute = 'dashboard';
  @Output() url = new EventEmitter<string>();
  @Output() logout = new EventEmitter<boolean>();

  navigateToURL(url: string) {
    // this.activeRoute = url;
    // console.log(this.activeRoute);
    this.url.emit('/' + url);
  }
  emitlogout() {
    this.logout.emit(true);
  }

  isExpanded(url: string) {
    return this.activeRoute.split('/')[1] === url;
  }
  isActive(url: string) {
    const splitted = this.activeRoute.split('/');
    return splitted[splitted.length - 1] === url ? 'active' : 'inactive';
  }
}
