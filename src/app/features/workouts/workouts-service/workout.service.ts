import { Injectable } from '@angular/core';
import { Workout } from '../workout.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  previousPosition: number;
  listTotal: number;
  selectedWorkouts: BehaviorSubject<any>;
  workouts: Workout[] = [];

  filteredList;

  constructor() {
    this.selectedWorkouts = new BehaviorSubject(this.workouts);
    this.listTotal = this.workouts.length;
  }

  // For data storage. Retrieves all workouts even with checked boxes rather than just the selected workouts
  getAllWorkouts() {
    return this.workouts.slice();
  }

  // Return selected workouts so checkboxes work and can subscribe to the behavior subject
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

  clearWorkouts() {
    const emptyWorkouts = [];
    this.selectedWorkouts.next(emptyWorkouts);
    this.listTotal = 0;
  }

  // Updates workout instead of creating a new one while in editMode
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

  filterWorkouts(phases: string[], specialties: string[], duration: number[], types: string[], zwo: string[]) {
    const workouts = this.workouts.filter((workout) => {
      return (
        (!phases.length || phases.some((phase) => workout.phase.includes(phase))) &&
        (!specialties.length || specialties.some((specialty) => workout.specialty.includes(specialty))) &&
        (duration.length === 0 || duration.indexOf(workout.duration) >= 0) &&
        (types.length === 0 || types.indexOf(workout.type) >= 0) &&
        (zwo.length === 0 || zwo.indexOf(workout.zwo) >= 0)
      );
    });
    this.selectedWorkouts.next(workouts);

    // sets filteredList to workouts to allow sort functionality
    this.filteredList = workouts;

    // Removes overlay after select on small devices
    if (window.innerWidth < 981) {
      document.getElementById('filter').style.display = 'none';
    } else {
      return;
    }
  }

  // Set workouts fetched from server
  setWorkouts(workouts: Workout[]) {
    if (workouts == null) {
      return;
    } else if (workouts !== null) {
      this.workouts = workouts;
      this.selectedWorkouts.next(this.workouts);
      this.listTotal = this.workouts.length;
    }
  }

  //// Sort By: events
  sortByTitle() {
    if (!this.filteredList) {
      this.workouts.sort(this.sortTitle);
    } else {
      this.filteredList.sort(this.sortTitle);
      // Keeps entire list sorted instead of only filtered list
      this.workouts.sort(this.sortTitle);
    }
    return;
  }
  sortByPhase() {
    if (!this.filteredList) {
      this.workouts.sort(this.sortPhase);
    } else {
      this.filteredList.sort(this.sortPhase);
      // Keeps entire list sorted instead of only filtered list
      this.workouts.sort(this.sortPhase);
    }
    return;
  }
  sortByDuration() {
    if (!this.filteredList) {
      this.workouts.sort(this.sortDuration);
    } else {
      this.filteredList.sort(this.sortDuration);
      // Keeps entire list sorted instead of only filtered list
      this.workouts.sort(this.sortDuration);
    }
    return;
  }

  sortTitle(a, b) {
    return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
  }
  sortPhase(a, b) {
    return a.phase > b.phase ? -1 : b.phase > a.phase ? 1 : 0;
  }
  sortDuration(a, b) {
    return a.duration - b.duration;
  }
}
