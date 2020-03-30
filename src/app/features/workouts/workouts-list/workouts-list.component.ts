import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { WorkoutService } from "../workouts-service/workout.service";

@Component({
  selector: "app-workouts-list",
  templateUrl: "./workouts-list.component.html",
  styleUrls: ["./workouts-list.component.scss"]
})
export class WorkoutsListComponent implements OnInit, OnDestroy {
  workouts: any;
  listCount;
  listTotal;
  index: number;
  workoutSubscription;
  @Input() previousPosition: number;

  constructor(private workoutService: WorkoutService) {
    this.workoutSubscription = this.workoutService
      .getWorkouts()
      .subscribe(res => {
        this.workouts = res;
        this.listCount = this.workouts.length;

        // "Hack" to get the list total to work... Fix later
        if (this.workouts.length >= this.workoutService.listTotal) {
          this.listTotal = this.workouts.length;
        } else if (this.workoutService.listTotal > this.workouts.length) {
          this.listTotal = this.workoutService.listTotal;
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.workoutSubscription.unsubscribe();
  }
  scrollPosition() {
    // Keeps previous scroll position in service for when back button is clicked on the workoutdetail page
    this.workoutService.previousPosition = document.getElementById(
      "detail"
    ).scrollTop;
  }
}
