import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-workouts",
  templateUrl: "./workouts.component.html",
  styleUrls: ["./workouts.component.scss"]
})
export class WorkoutsComponent implements OnInit {
  @Output() navOpen: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
