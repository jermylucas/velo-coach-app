import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { SidenavService } from '../app/core/services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Router,
  RoutesRecognized,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
} from '@angular/router';
import { WorkoutService } from './features/workouts/services/workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'velo-coach-app';
  loadingRouteConfig: boolean;
  id;
  showToggle: string;
  mode: any;
  openSidenav: boolean;
  previousPosition: number;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  @ViewChild('sidenav', { static: true }) matSidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private workoutService: WorkoutService
  ) // private authService: AuthService
  {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.matSidenav);
    // this.authService.autoLogin();
    this.getScreenWidth().subscribe((width) => {
      if (width < 640) {
        this.showToggle = 'show';
        this.mode = 'over';
        this.openSidenav = false;
      } else if (width > 640) {
        this.showToggle = 'hide';
        this.mode = 'side';
        this.openSidenav = true;
      }
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loadingRouteConfig = true;
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loadingRouteConfig = false;
    }
  }

  resetPosition() {
    const myDiv = document.getElementById('detail');
    // get router id from params to check position and reset
    const routeSub = this.router.events.subscribe((val) => {
      // The val.state.root.firstchild.url returns an array of the url
      // workouts/1 would be an array of 2 object paths: "workouts" and 1
      // This statement checks to see if you are returning to the workout list,
      // and if so, it will remember your scroll position and return to the same spot so you don't need to scroll down again
      if (val instanceof RoutesRecognized) {
        this.id = val.state.root.firstChild!.url;
        if (this.id.length === 1 && this.id[0].path === 'workouts') {
          myDiv!.scrollTop = this.workoutService.previousPosition;
        } else {
          myDiv!.scrollTop = 0;
        }
        // unsubscribe to avoid repeating every time route changes
        routeSub.unsubscribe();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
}
