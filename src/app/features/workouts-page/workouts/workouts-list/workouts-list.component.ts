import { Component, OnInit } from "@angular/core";
import { Workout } from "../workout.model";
import { WorkoutService } from "../../workoutservice/workout.service";

@Component({
  selector: "app-workouts-list",
  templateUrl: "./workouts-list.component.html",
  styleUrls: ["./workouts-list.component.scss"]
})
export class WorkoutsListComponent implements OnInit {
  workouts: any;

  constructor(private workoutService: WorkoutService) {
    this.workoutService.getWorkouts().subscribe(res => {
      this.workouts = res;
      console.log("List Comp: ", this.workouts);
    });
  }

  ngOnInit() {}
}
