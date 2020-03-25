import { Component, ViewChild, HostListener } from "@angular/core";
import { SidenavService } from "./services/sidenav.service";
import { MatSidenav } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";
import {
  Router,
  RoutesRecognized,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from "@angular/router";
import { WorkoutService } from "./features/workouts-page/workoutservice/workout.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "velo-coach-app";
  loadingRouteConfig: boolean;
  id;
  showToggle: string;
  mode: string;
  openSidenav: boolean;
  previousPosition: number;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  @ViewChild("sidenav", { static: true }) matSidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
    this.sidenavService.setSidenav(this.matSidenav);

    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
        this.showToggle = "show";
        this.mode = "over";
        this.openSidenav = false;
      } else if (width > 640) {
        this.showToggle = "hide";
        this.mode = "side";
        this.openSidenav = true;
      }
    });
  }

  resetPosition() {
    let myDiv = document.getElementById("detail");
    // get router id from params to check position and reset
    let routeSub = this.router.events.subscribe(val => {
      // The val.state.root.firstchild.url returns an array of the url. ... workouts/1 would be an array of 2 object paths: "workouts" and 1. This statement checks to see if you are returning to the workout list, and if so, it will remember your scroll position and return to the same spot so you don't need to scroll down again
      if (val instanceof RoutesRecognized) {
        this.id = val.state.root.firstChild.url;
        if (this.id.length === 1 && this.id[0].path === "workouts") {
          myDiv.scrollTop = this.workoutService.previousPosition;
        } else {
          myDiv.scrollTop = 0;
        }
        // unsubscribe to avoid repeating every time route changes
        routeSub.unsubscribe();
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
}
