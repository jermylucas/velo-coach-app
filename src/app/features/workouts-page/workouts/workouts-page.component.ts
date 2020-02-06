import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-workouts",
  templateUrl: "./workouts-page.component.html",
  styleUrls: ["./workouts-page.component.scss"]
})
export class WorkoutsComponent implements OnInit {
  @Output() navOpen: EventEmitter<any> = new EventEmitter();
  value = "";
  opened = false;

  constructor() {}

  ngOnInit() {}

  openNav() {
    if (this.opened) {
      document.getElementById("filter").style.display = "none";
      this.opened = false;
    } else {
      document.getElementById("filter").style.display = "block";
      this.opened = true;
    }
  }
}
