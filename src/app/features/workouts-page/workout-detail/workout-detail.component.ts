import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router, NavigationEnd } from "@angular/router";
import { WorkoutService } from "../workoutservice/workout.service";
import { Workout } from "../workouts/workout.model";
import { LocalStorageService } from "../../../services/local-storage.service";
import { DataStorageService } from "../../../../app/services/datastorage.service";
import { FirebaseStorageService } from "../../../../app/services/firebase-storage.service";

import { PopupService } from "./../../../../app/services/snackbar.service";

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
    private storageService: LocalStorageService,
    private fireStorageService: FirebaseStorageService,
    private popupService: PopupService
  ) {}

  goBack() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: Workout = data["resolveData"];
      this.workout = resolvedData;
    });

    // Sets current workout to local storage
    if (this.workout) {
      this.storageService.setItem(
        "activeWorkout",
        JSON.stringify(this.workout)
      );
    }

    const activeWorkout = JSON.parse(
      this.storageService.getItem("activeWorkout")
    );

    // Gets workout from storage if there is one
    if (activeWorkout) {
      this.workout = activeWorkout;
    }
  }

  // Opens workout edit page with current workout
  onEditWorkout() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteWorkout() {
    if (
      confirm(
        "Are you sure you want to delete this workout? This action cannot be undone."
      )
    ) {
      this.fireStorageService.onDeleteImage(this.workout.imageUrl);
      this.workoutService.deleteWorkout(this.id);
      this.router.navigate(["/workouts"]);
      this.dataStorage.storeWorkouts();
      this.popupService.openSnackBar("Workout Deleted From Server");
    }
  }
}
