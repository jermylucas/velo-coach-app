import { Component } from "@angular/core";
import { SidenavService } from "../../../app/services/sidenav.service";
import { DatastorageService } from "src/app/services/datastorage.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent {
  panelOpenState: boolean = false;
  screenSize: boolean;

  constructor(
    private sidenavService: SidenavService,
    private dataStorageService: DatastorageService
  ) {}

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

  onStore() {
    this.dataStorageService.storeWorkouts();
    alert("These workouts have been stored to the cloud.");
  }
}
