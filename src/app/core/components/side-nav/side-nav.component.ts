import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  panelOpenState = false;

  constructor(
    private sidenavService: SidenavService,
    private authService: FirebaseAuthService,
    private store: Store,
    private router: Router
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((res) => {
      this.isAuthenticated = !!res;
    });
  }

  closePanel() {
    this.panelOpenState = false;
  }

  // This closes sidenav if window inner width is less than 769
  closeNav() {
    if (window.innerWidth < 980) {
      this.sidenavService.close();
    } else {
      this.sidenavService.open();
    }
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    // this.workoutService.clearWorkouts();
  }
  onLogin() {
    this.router.navigate(['/auth']);
  }
}
