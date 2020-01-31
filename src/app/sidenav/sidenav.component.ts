import { Component, OnInit, OnDestroy, Output } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  panelOpenState: boolean = false;
  subscription;

  constructor(private router: Router) {}

  ngOnInit() {}

  routerChange() {
    if (this.router.url.includes("trainingplans")) {
      console.log("training");
    } else if (this.router.url.includes("workouts")) {
      console.log("workouts");
    }
    return;
  }

  ngOnDestroy() {}
}
