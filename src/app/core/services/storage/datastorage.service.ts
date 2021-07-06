import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { PopupService } from '../snackbar.service';
import { LocalStorageService } from './local-storage.service';
import { WorkoutService } from 'src/app/features/workouts/services/workout.service';
import { Workout } from 'src/app/features/workouts/workout.state';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private workoutService: WorkoutService,
    private popupService: PopupService,
    private localStorage: LocalStorageService
  ) {}

  storeWorkouts() {
    const currentId = JSON.parse(
      this.localStorage.getItemLocally('userData') || '{}'
    );
    const workouts = this.workoutService.getAllWorkouts();
    this.http
      .put(
        `https://velo-coach-app.firebaseio.com/workouts/${currentId.id}.json`,
        workouts
      )
      .subscribe((response) => console.log('Workouts Saved: ', response));
    this.popupService.openSnackBar('Workouts Saved to Server');
  }

  // fetchWorkouts() {
  //   const currentId = JSON.parse(
  //     this.localStorage.getItemLocally('userData') || '{}'
  //   );
  //   return this.http
  //     .get<Workout[]>(
  //       `https://velo-coach-app.firebaseio.com/workouts/${currentId.id}.json`
  //     )
  //     .pipe(
  //       map((workouts) => {
  //         return workouts;
  //       }),
  //       tap((workouts) => {
  //         this.workoutService.setWorkouts(workouts);
  //         this.popupService.openSnackBar('Workouts Fetch From Server');
  //       })
  //     );
  // }
}
