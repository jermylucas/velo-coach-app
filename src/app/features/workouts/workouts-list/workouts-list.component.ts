import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit, OnDestroy {
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

  constructor(
    private workoutService: WorkoutService,
    private db: AngularFireDatabase
  ) {
    this.workoutsRef = this.db.list('workouts');

    // Adds workout to DB
    // this.db.list('workouts').push(this.sampleWorkout);

    this.workoutsRef
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }))
        )
      )
      .subscribe((res) => {
        this.workouts = res;
        console.log('Workouts Res', this.workouts);
      });

    // this.workoutSubscription = this.workoutService
    //   .getWorkouts()
    //   .subscribe((res) => {
    //     if (res == null) {
    //       this.listTotal = null;
    //       this.listCount = null;
    //     } else if (res !== null) {
    //       this.workouts = res;
    //       this.listCount = this.workouts.length;
    //       // "Hack" to get the list total to work... Fix later
    //       if (this.workouts.length >= this.workoutService.listTotal) {
    //         this.listTotal = this.workouts.length;
    //       } else if (this.workoutService.listTotal > this.workouts.length) {
    //         this.listTotal = this.workoutService.listTotal;
    //       }
    //     }
    //   });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.workoutSubscription.unsubscribe();
  }
  scrollPosition() {
    // Keeps previous scroll position in service for when back button is clicked on the workoutdetail page
    this.workoutService.previousPosition =
      document.getElementById('detail')!.scrollTop;
  }
}
