import { Component, ViewChild, HostListener } from "@angular/core";
import { SidenavService } from "./sidenav.service";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "velo-coach-app";
  smallScreen;

  @ViewChild("sidenav", { static: true }) public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.configureSideNav();
  }

  configureSideNav() {
    this.smallScreen = window.innerWidth < 769 ? true : false;
    if (!this.smallScreen) {
      this.sidenav.mode = "side";
      this.sidenav.opened = true;
    } else {
      this.sidenav.mode = "over";
      this.sidenav.opened = false;
    }
  }
}
