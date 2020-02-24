import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { WorkoutService } from "../workoutservice/workout.service";
import { Workout } from "../workouts/workout.model";
import { StorageService } from "../../../services/storage.service";
import { DataStorageService } from "src/app/services/datastorage.service";
import { Subscription } from "rxjs";

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
    private dataStorage: DataStorageService,
    private storageService: StorageService
  ) {}

  goBack() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.workout = this.workoutService.getWorkout(this.id);
    });

    if (this.workout) {
      this.storageService.setItem(
        "activeWorkout",
        JSON.stringify(this.workout)
      );
      console.log("Saved to storage.");
    }

    const activeWorkout = JSON.parse(
      this.storageService.getItem("activeWorkout")
    );

    if (activeWorkout) {
      this.workout = activeWorkout;
      console.log("Workout loaded from storage");
    }
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
