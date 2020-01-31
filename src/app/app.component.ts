import { Component, ViewChild } from "@angular/core";
import { SidenavService } from "./sidenav.service";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "velo-coach-app";

  @ViewChild("sidenav", { static: true }) public sidenav: MatSidenav;

  panelOpenState: boolean = false;

  closePanel() {
    this.panelOpenState = false;
  }

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
