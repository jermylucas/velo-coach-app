import { Component } from "@angular/core";
import { SidenavService } from "src/app/services/sidenav.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent {
  panelOpenState: boolean = false;
  screenSize: boolean;

  constructor(private sidenavService: SidenavService) {}

  closePanel() {
    this.panelOpenState = false;
  }

  // This closes sidenav if window inner width is less than 769
  closeNav() {
    if (window.innerWidth < 769) {
      this.sidenavService.close();
    } else {
      this.sidenavService.open();
    }
  }
}
