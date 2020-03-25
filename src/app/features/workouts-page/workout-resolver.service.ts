import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable } from "rxjs";

import { Workout } from "../workouts/workout.model";
import { WorkoutService } from "./workout.service";

@Injectable({
  providedIn: "root"
})
export class WorkoutResolver implements Resolve<Workout> {
  constructor(private workoutService: WorkoutService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Workout> {
    const id = +route.paramMap.get("id");
    return this.workoutService.getWorkout(id);
  }
}
