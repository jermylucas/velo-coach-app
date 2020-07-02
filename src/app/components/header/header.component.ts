import { Component, OnInit, OnDestroy } from "@angular/core";
import { SidenavService } from "../../core/services/sidenav.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeUser: string = null;
  userSub: Subscription;

  constructor(
    private sidenav: SidenavService,
    private authService: AuthService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.activeUser = user.displayName;
      } else if (!user) {
        this.activeUser = null;
      }
    });
  }

  ngOnInit() {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
