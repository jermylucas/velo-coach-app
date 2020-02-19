import { Component, OnInit, OnDestroy } from "@angular/core";
import { Workout } from "../workout.model";
import { WorkoutService } from "../../workoutservice/workout.service";

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

  isLoading = false;

  constructor(private workoutService: WorkoutService) {
    this.workoutSubscription = this.workoutService
      .getWorkouts()
      .subscribe(res => {
        this.workouts = res;
        this.listCount = this.workouts.length;

        console.log("list comp");

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
}
