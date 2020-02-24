import { Injectable } from "@angular/core";
import { Workout } from "../workouts/workout.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
  listTotal: number;

  selectedWorkouts: BehaviorSubject<any>;
  workouts: Workout[] = [];

  constructor() {
    this.selectedWorkouts = new BehaviorSubject(this.workouts);
    this.listTotal = this.workouts.length;
  }

  // For data storage. Always retrieves all workouts even with checked boxes rather than just the selected workouts. This prevents some potential bugs
  getAllWorkouts() {
    return this.workouts.slice();
  }

  //Return selected workouts so checkboxes work and can subscribe to the behavior subject
  getWorkouts() {
    return this.selectedWorkouts;
  }

  // For selecting workouts when boxes are checked (doesn't mess up array with checked boxes)
  getWorkout(index: number) {
    return this.selectedWorkouts.value[index];
  }

  // Add workouts from workout-edit
  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.selectedWorkouts.next(this.workouts.slice());

    // update list total on addition of new workout
    this.listTotal = this.workouts.length;
  }

  //Updates workout instead of creating a new one while in editMode
  updateWorkout(index: number, newWorkout: Workout) {
    this.workouts[index] = newWorkout;
    this.selectedWorkouts.next(this.workouts.slice());
  }

  deleteWorkout(index: number) {
    this.workouts.splice(index, 1);
    this.selectedWorkouts.next(this.workouts.slice());

    // update list total on addition of new workout
    this.listTotal = this.workouts.length;
  }

  filterWorkouts(
    phases: string[],
    specialties: string[],
    duration: number[],
    types: string[],
    zwo: string[]
  ) {
    const workouts = this.workouts.filter(workout => {
      return (
        (!phases.length ||
          phases.some(phase => workout.phase.includes(phase))) &&
        (!specialties.length ||
          specialties.some(specialty =>
            workout.specialty.includes(specialty)
          )) &&
        (duration.length === 0 || duration.indexOf(workout.duration) >= 0) &&
        (types.length === 0 || types.indexOf(workout.type) >= 0) &&
        (zwo.length === 0 || zwo.indexOf(workout.zwo) >= 0)
      );
    });
    this.selectedWorkouts.next(workouts);

    if (window.innerWidth < 981) {
      document.getElementById("filter").style.display = "none";
    } else {
      return;
    }
  }

  // Set workouts fetched from server
  setWorkouts(workouts: Workout[]) {
    this.workouts = workouts;
    this.selectedWorkouts.next(this.workouts);
    this.listTotal = this.workouts.length;
  }
}

// WORKOUT MODEL
//
// title: string,
// description: string,
// imagePath: string,
// type: string,
// duration: number,
// specialty: string[],
// phase: string[],
// zwo: boolean
