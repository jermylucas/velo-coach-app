import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/storage/local-storage.service';

import { PopupService } from '../../../core/services/snackbar.service';
import { WorkoutService } from '../services/workout.service';
import { Workout, WorkoutState } from '../workout.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
})
export class WorkoutDetailComponent implements OnInit {
  @Select(WorkoutState.workouts) workouts$: Observable<Workout[]>;
  id: number;
  workout: Workout;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
    // private dataStorage: DataStorageService,
    private storageService: LocalStorageService,
    // private fireStorageService: FirebaseStorageService,
    private popupService: PopupService
  ) {}

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
      const resolvedData: Workout = data['resolveData'];
      this.workout = resolvedData;
    });

    // Sets current workout to local storage
    if (this.workout) {
      this.storageService.setItem(
        'activeWorkout',
        JSON.stringify(this.workout)
      );
    }

    const activeWorkout = JSON.parse(
      this.storageService.getItem('activeWorkout') || '{}'
    );

    // Gets workout from storage if there is one
    if (activeWorkout) {
      this.workout = activeWorkout;
    }
  }

  // Opens workout edit page with current workout
  onEditWorkout() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteWorkout() {
    if (
      confirm(
        'Are you sure you want to delete this workout? This action cannot be undone.'
      )
    ) {
      // this.fireStorageService.onDeleteImage(this.workout.imageUrl);
      this.workoutService.deleteWorkout(this.id);
      this.router.navigate(['/workouts']);
      // this.dataStorage.storeWorkouts();
      this.popupService.openSnackBar('Workout Deleted From Server');
    }
  }
}
