import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { WorkoutService } from "../workoutservice/workout.service";
import { Workout } from "../workouts/workout.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-workout-detail",
  templateUrl: "./workout-detail.component.html",
  styleUrls: ["./workout-detail.component.scss"]
})
export class WorkoutDetailComponent implements OnInit {
  id: number;
  workout: Workout;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.workout = this.workoutService.getWorkout(this.id);
    });
  }
}
