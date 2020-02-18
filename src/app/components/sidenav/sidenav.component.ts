import { Component, OnInit } from "@angular/core";
import { SidenavService } from "../../../app/services/sidenav.service";
import { DatastorageService } from "src/app/services/datastorage.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  panelOpenState: boolean = false;
  screenSize: boolean;

  constructor(
    private sidenavService: SidenavService,
    private dataStorageService: DatastorageService
  ) {}

  ngOnInit() {
    this.onFetchData();
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

  onStoreData() {
    this.dataStorageService.storeWorkouts();
    alert("These workouts have been stored to the cloud.");
  }

  onFetchData() {
    this.dataStorageService.fetchWorkouts().subscribe();

    console.log("Fetch Workouts from Service");
  }
}
