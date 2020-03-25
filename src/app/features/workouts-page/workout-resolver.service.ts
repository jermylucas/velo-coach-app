import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";

import { WorkoutResolved } from "../workouts-page/workouts/workout.model";
import { WorkoutService } from "../workouts-page/workoutservice/workout.service";

@Injectable({
  providedIn: "root"
})
export class WorkoutResolver implements Resolve<WorkoutResolved> {
  constructor(private workoutService: WorkoutService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get("id");
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      if (confirm("Error was found in URL. Please try action again.")) {
        console.error(message);
        this.router.navigate(["workouts"]);
      }
    }
    return this.workoutService.getWorkout(+id);
  }
}
