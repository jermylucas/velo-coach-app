import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/core/components/auth/user.state';
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

  workouts: any = [];
  fireWorkouts: AngularFireObject<any>;
  listCount: number | null;
  listTotal: number | null;
  index: number;
  workoutSubscription;
  @Input() previousPosition: number;
  workoutsRef;
  details: boolean;

  item: Observable<any>;

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

  constructor(
    private workoutService: WorkoutService,
    private store: Store,
    private db: AngularFireDatabase
  ) {
    this.workoutsRef = this.db.list('workouts');
    // Adds workout to DB

    // const uid = this.store.selectSnapshot(UserState.user)?.id;
    // console.log(uid);
    // this.db.list(`workouts/${uid}`).push(this.sampleWorkout);
  }

  ngOnInit() {
    this.workoutList$.subscribe((res) => {
      if (res) {
        this.workouts = JSON.parse(JSON.stringify(res));
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

  hoverListItem(workout) {
    workout.hoverState = true;
    console.log(workout.hoverState);
    workout.listItemHovered = !workout.listItemHovered;
  }

  scrollPosition() {
    // Keeps previous scroll position in service for when back button is clicked on the workoutdetail page
    this.workoutService.previousPosition =
      document.getElementById('detail')!.scrollTop;
  }
}
