import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { WorkoutService } from "../workoutservice/workout.service";
import { Workout } from "../workouts/workout.model";
import { DataStorageService } from "src/app/services/datastorage.service";

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
    private router: Router,
    private dataStorage: DataStorageService
  ) {}

  goBack() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.workout = this.workoutService.getWorkout(this.id);
    });
  }

  // Opens up workout edit page with current workout
  onEditWorkout() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteWorkout() {
    if (
      confirm(
        "Are you sure you want to delete this workout? This action cannot be undone."
      )
    ) {
      this.workoutService.deleteWorkout(this.id);
      this.router.navigate(["/workouts"]);
      this.dataStorage.storeWorkouts();
    }
  }
}
