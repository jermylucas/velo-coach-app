import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkoutService } from '../services/workout.service';
import { Workout, WorkoutState } from '../workout.state';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit, OnDestroy {
  @Select(WorkoutState.workoutList) workoutList$: Observable<Workout[]>;
  @Select(WorkoutState.loading) loading$: Observable<boolean>;

  workouts: any;
  fireWorkouts: AngularFireObject<any>;
  listCount: number | null;
  listTotal: number | null;
  index: number;
  workoutSubscription;
  @Input() previousPosition: number;
  workoutsRef;

  sampleWorkout = {
    description: '<font face="Roboto">This is a workout...<br></font>',
    duration: 50,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/velo-coach-app.appspot.com/o/workout-images%2FCapture.PNG_1585957054363?alt=media&token=56ae157e-6671-43ca-8ec9-a95bc8e93a47',
    phase: ['Base 2', 'Base 3'],
    specialty: ['Criterium'],
    title: 'Test workout',
    type: 'Aerobic / Endurance',
    zwo: 'No',
  };

  constructor(private workoutService: WorkoutService, private store: Store) {}

  ngOnInit() {
    this.workoutList$.subscribe((res) => {
      if (res) {
        this.workouts = res;
        this.listCount = this.workouts.length;
        this.listTotal = this.store.selectSnapshot(
          WorkoutState.workouts
        ).length;
      } else {
        this.listCount = 0;
        this.listTotal = 0;
      }
    });
  }

  ngOnDestroy() {
    // this.workoutSubscription.unsubscribe();
  }
  scrollPosition() {
    // Keeps previous scroll position in service for when back button is clicked on the workoutdetail page
    this.workoutService.previousPosition =
      document.getElementById('detail')!.scrollTop;
  }
}
