import { Injectable } from "@angular/core";
import { Workout } from "../workouts/workout.model";
import { BehaviorSubject } from "rxjs";
import { DataStorageService } from "src/app/services/datastorage.service";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
  listTotal: number;

  selectedWorkouts: BehaviorSubject<any>;
  workouts: Workout[] = [
    // Dummy data for workout Page UI Building
    // new Workout(
    //   "SS7-2",
    //   `Chin up dumbbell weightlifting legs, upper back running bounce gym training cardio endurance fit. Arm Smith machine tuck sit, train calves pushup lower body equipment equipment fitness muscles jacks bodyweight. Bounce leg press barbell, curl bodyweight training pushup push warm up cardio extension chin up. Fitness pulldown lunge arm heart rate fitness bounce bodyweight. Chin up running jump, squat body composition body fat percentage bodyweight raise burpees leg press lats arm.`,
    //   "../../../../assets/img/placeholder.png",
    //   "Anaerobic",
    //   60,
    //   ["Hill Climb", "Cross Country MTB"],
    //   ["Base 1", "Base 2", "Base 3", "Build 1", "Build 2"],
    //   "No"
    // ),
    // new Workout(
    //   "SS6-3",
    //   `Climp chin up tuck jacks warm up body fat percentage ball pulldown, physical chin up lower body gym. Walking raise legs leg press climp stretch barbell ball. Smith machine plank dip muscles bench BMI raise, deadlift major lower body leg major lower back abs. Chest fly gym pectorals crunch endurance, barbell warm up leg press endurance climp. Running pushup stretch pull extension body fat percentage lower body kettlebell calves.`,
    //   "../../../../assets/img/placeholder.png",
    //   "Aerobic / Endurance",
    //   30,
    //   ["Road Race", "Gravel", "Time Trial"],
    //   ["Build 1"],
    //   "Yes"
    // ),
    // new Workout(
    //   "Name",
    //   "Curl tuck flexibility calves climp curl, lower body pullup physical squat dip pectorals kettlebell equipment. Bear crawl aerobic physical burpees upright row train plank, endurance ball bodyweight jacks mountain climber. Body composition mountain climber legs chin up, jump fit plank body fat percentage kick burpees biceps plank physical barbell. ",
    //   "../../../assets/img/placeholder.png",
    //   "Tempo",
    //   90,
    //   ["Cyclocross", "Cross Country MTB", "Criterium"],
    //   ["Race", "Peak", "Testing"],
    //   "No"
    // ),
    // new Workout(
    //   "SS7-2",
    //   `Chin up dumbbell weightlifting legs, upper back running bounce gym training cardio endurance fit. Arm Smith machine tuck sit, train calves pushup lower body equipment equipment fitness muscles jacks bodyweight.
    //   Bounce leg press barbell, curl bodyweight training pushup push warm up cardio extension chin up. Fitness pulldown lunge arm heart rate fitness bounce bodyweight. Chin up running jump, squat body composition body fat percentage bodyweight raise burpees leg press lats arm.`,
    //   "../../../../assets/img/placeholder.png",
    //   "Anaerobic",
    //   30,
    //   ["Road Race"],
    //   ["Base 1", "Base 2"],
    //   "No"
    // ),
    // new Workout(
    //   "multi sample",
    //   `Chin up dumbbell weightlifting legs, upper back running bounce gym training cardio endurance fit. Arm Smith machine tuck sit, train calves pushup lower body equipment equipment fitness muscles jacks bodyweight. Bounce leg press barbell, curl bodyweight training pushup push warm up cardio extension chin up. Fitness pulldown lunge arm heart rate fitness bounce bodyweight. Chin up running jump, squat body composition body fat percentage bodyweight raise burpees leg press lats arm.`,
    //   "../../../../assets/img/placeholder.png",
    //   "Anaerobic",
    //   45,
    //   ["Road Race"],
    //   ["Base 3", "Build 1", "Build 2"],
    //   "No"
    // )
  ];

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
// Dummy data during testing
//

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
