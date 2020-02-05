import { Injectable } from "@angular/core";
import { Workout } from "../workouts/workout.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
  listTotal: number;
  selectedWorkouts: BehaviorSubject<any>;
  workouts: Workout[] = [
    new Workout(
      "SS7-2",
      `Chin up dumbbell weightlifting legs, upper back running bounce gym training cardio endurance fit. Arm Smith machine tuck sit, train calves pushup lower body equipment equipment fitness muscles jacks bodyweight. Bounce leg press barbell, curl bodyweight training pushup push warm up cardio extension chin up. Fitness pulldown lunge arm heart rate fitness bounce bodyweight. Chin up running jump, squat body composition body fat percentage bodyweight raise burpees leg press lats arm.`,
      "../../../../assets/img/placeholder.png",
      "Anaerobic",
      20,
      "Road Race",
      "Base 1",
      false
    ),
    new Workout(
      "SS6-3",
      `Climp chin up tuck jacks warm up body fat percentage ball pulldown, physical chin up lower body gym. Walking raise legs leg press climp stretch barbell ball. Smith machine plank dip muscles bench BMI raise, deadlift major lower body leg major lower back abs. Chest fly gym pectorals crunch endurance, barbell warm up leg press endurance climp. Running pushup stretch pull extension body fat percentage lower body kettlebell calves.`,
      "../../../../assets/img/placeholder.png",
      "Aerobic / Endurance",
      10,
      "Road Race",
      "Build 1",
      true
    ),
    new Workout(
      "Name",
      "Curl tuck flexibility calves climp curl, lower body pullup physical squat dip pectorals kettlebell equipment. Bear crawl aerobic physical burpees upright row train plank, endurance ball bodyweight jacks mountain climber. Body composition mountain climber legs chin up, jump fit plank body fat percentage kick burpees biceps plank physical barbell. ",
      "../../../assets/img/placeholder.png",
      "Tempo",
      60,
      "Road Race",
      "Race",
      true
    )
  ];

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

  constructor() {
    this.selectedWorkouts = new BehaviorSubject(this.workouts);
    this.listTotal = this.workouts.length;
  }

  getWorkouts() {
    return this.selectedWorkouts.asObservable();
  }

  filterWorkouts(phases: string[], specialties: string[], types: string[]) {
    const workouts = this.workouts.filter(workout => {
      return (
        (phases.length === 0 || phases.indexOf(workout.phase) >= 0) &&
        (specialties.length === 0 ||
          specialties.indexOf(workout.specialty) >= 0) &&
        (types.length === 0 || types.indexOf(workout.type) >= 0)
      );
    });
    this.selectedWorkouts.next(workouts);
  }
}
