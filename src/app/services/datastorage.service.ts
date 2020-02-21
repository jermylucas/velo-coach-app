import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkoutService } from "../features/workouts-page/workoutservice/workout.service";
import { Workout } from "../features/workouts-page/workouts/workout.model";
import { map, tap } from "rxjs/operators";

//
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private workoutService: WorkoutService
  ) {}

  storeWorkouts() {
    const workouts = this.workoutService.getAllWorkouts();
    this.http
      .put("https://velo-coach-app.firebaseio.com/workouts.json", workouts)
      .subscribe(response => console.log(response));
    console.log(workouts);
  }

  fetchWorkouts() {
    return this.http
      .get<Workout[]>("https://velo-coach-app.firebaseio.com/workouts.json")
      .pipe(
        map(workouts => {
          return workouts;
        }),
        tap(workouts => {
          this.workoutService.setWorkouts(workouts);
        })
      );
  }
}
