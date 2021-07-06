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

  workouts: any = [];
  fireWorkouts: AngularFireObject<any>;
  listCount: number | null;
  listTotal: number | null;
  index: number;
  workoutSubscription;
  @Input() previousPosition: number;
  workoutsRef;
  details: boolean;

  constructor(private workoutService: WorkoutService, private store: Store) {}

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
