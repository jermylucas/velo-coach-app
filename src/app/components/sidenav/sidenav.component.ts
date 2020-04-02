import { Component, OnDestroy, OnInit } from "@angular/core";
import { SidenavService } from "../../core/services/sidenav.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;
  panelOpenState: boolean = false;
  screenSize: boolean;

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    console.log("Auth user: ", this.authService.activeUser);
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
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
  onLogin() {
    this.router.navigate(["/auth"]);
  }
}
