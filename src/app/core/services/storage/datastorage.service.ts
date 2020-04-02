import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkoutService } from "../../../features/workouts/workouts-service/workout.service";
import { Workout } from "../../../features/workouts/workout.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";

import { PopupService } from "../snackbar.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private workoutService: WorkoutService,
    private popupService: PopupService,
    private authService: AuthService
  ) {}

  storeWorkouts() {
    const workouts = this.workoutService.getAllWorkouts();
    this.http
      .put("https://velo-coach-app.firebaseio.com/workouts.json", workouts)
      .subscribe(response => console.log("Workouts Saved: ", response));
    this.popupService.openSnackBar("Workouts Saved to Server");
  }

  fetchWorkouts() {
    return this.authService.activeUser.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Workout[]>(
          "https://velo-coach-app.firebaseio.com/workouts.json?auth=" +
            user.token
        );
      }),
      map(workouts => {
        return workouts;
      }),
      tap(workouts => {
        this.workoutService.setWorkouts(workouts);
        this.popupService.openSnackBar("Workouts Fetch From Server");
      })
    );
  }
}
