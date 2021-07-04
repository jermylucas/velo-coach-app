import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeUser = null;
  // userSub: Subscription;

  constructor(private sidenav: SidenavService) {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   if (user) {
    //     this.activeUser = user.displayName;
    //   } else if (!user) {
    //     this.activeUser = null;
    //   }
    // });
  }

  ngOnInit() {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }
}
