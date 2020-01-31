import { Component, Input } from "@angular/core";
import { WorkoutsComponent } from "./workouts/workouts.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "velo-coach-app";

  constructor(private workoutsComponent: WorkoutsComponent) {}
}
