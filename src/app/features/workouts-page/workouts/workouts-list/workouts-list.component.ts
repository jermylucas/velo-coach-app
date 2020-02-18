import { Component, OnInit, Input } from "@angular/core";
import { Workout } from "../workout.model";
import { WorkoutService } from "../../workoutservice/workout.service";

@Component({
  selector: "app-workouts-list",
  templateUrl: "./workouts-list.component.html",
  styleUrls: ["./workouts-list.component.scss"]
})
export class WorkoutsListComponent implements OnInit {
  workouts: any;
  listCount;
  listTotal;
  index: number;

  constructor(private workoutService: WorkoutService) {
    this.workoutService.getWorkouts().subscribe(res => {
      this.workouts = res;
      console.log("List Comp: ", this.workouts);

      this.listCount = this.workouts.length;

      // "Hack" to get the list total to work... Fix later
      if (this.workouts.length >= this.workoutService.listTotal) {
        this.listTotal = this.workouts.length;
      } else if (this.workoutService.listTotal > this.workouts.length) {
        this.listTotal = this.workoutService.listTotal;
      }
    });
  }

  ngOnInit() {}
}
