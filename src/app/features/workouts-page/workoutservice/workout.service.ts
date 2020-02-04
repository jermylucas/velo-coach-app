import { Injectable } from "@angular/core";
import { Workout } from "../workouts/workout.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
  selectedWorkouts: BehaviorSubject<any>;
  phaseLowerCase: [] = [];
  workouts: Workout[] = [
    new Workout(
      "SS7-2",
      `Chin up dumbbell weightlifting legs, upper back running bounce gym training cardio endurance fit. Arm Smith machine tuck sit, train calves pushup lower body equipment equipment fitness muscles jacks bodyweight. Bounce leg press barbell, curl bodyweight training pushup push warm up cardio extension chin up. Fitness pulldown lunge arm heart rate fitness bounce bodyweight. Chin up running jump, squat body composition body fat percentage bodyweight raise burpees leg press lats arm.`,
      "../../../../assets/img/placeholder.png",
      "Anaerobic",
      20,
      "road race",
      "Base 1",
      false
    ),
    new Workout(
      "SS6-3",
      `Climp chin up tuck jacks warm up body fat percentage ball pulldown, physical chin up lower body gym. Walking raise legs leg press climp stretch barbell ball. Smith machine plank dip muscles bench BMI raise, deadlift major lower body leg major lower back abs. Chest fly gym pectorals crunch endurance, barbell warm up leg press endurance climp. Running pushup stretch pull extension body fat percentage lower body kettlebell calves.`,
      "../../../../assets/img/placeholder.png",
      "Aerobic",
      10,
      "Mountain Biking",
      "Build 1",
      true
    ),
    new Workout(
      "Name",
      "Curl tuck flexibility calves climp curl, lower body pullup physical squat dip pectorals kettlebell equipment. Bear crawl aerobic physical burpees upright row train plank, endurance ball bodyweight jacks mountain climber. Body composition mountain climber legs chin up, jump fit plank body fat percentage kick burpees biceps plank physical barbell. ",
      "../../../assets/img/placeholder.png",
      "Sprint",
      60,
      "Road Biking",
      "Race",
      true
    )
  ];
  constructor() {
    this.selectedWorkouts = new BehaviorSubject(this.workouts);
  }

  getWorkouts() {
    return this.selectedWorkouts.asObservable();
  }

  filterWorkouts(phase: any[]) {
    console.log("SERVICE: ", phase);

    // I want the filter to take place here and put the filtered items back into the `this.workouts` array
  }

  /////
  //// Somewhat working code...
  ///
  // filterWorkouts(phase: any[], specialty?: any[]) {
  //   console.log("SERVICE: ", phase, specialty, this.workouts);
  //   let newArray: string[] = [];
  //   newArray = [...phase, ...specialty];
  //   console.log("NEW", newArray);
  //   this.workouts = this.workouts.filter(
  //     item => item.phase.toLowerCase() === phase[0].toLowerCase()
  //   );
  //   this.selectedWorkouts.next(this.workouts);
  //   console.log(this.workouts);
  // }
}
