import { Injectable } from "@angular/core";
import { Workout } from "../workouts/workout.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
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
      "Road Biking",
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
  }

  getWorkouts() {
    return this.selectedWorkouts.asObservable();
  }

  filterWorkouts(phases: string[], specialties: string[], type: string[]) {
    const byPhase = workout => phases.some(phase => workout.phase === phase);
    const bySpecialty = workout =>
      specialties.some(specialty => workout.specialty === specialty);
    const byType = workout => type.some(type => workout.type === type);

    if (phases.length === 0 && specialties.length === 0 && type.length === 0) {
      const workouts = this.workouts;
      this.selectedWorkouts.next(workouts);
    } else if (phases.length > 0 && specialties.length > 0 && type.length > 0) {
      const workouts = this.workouts.filter(
        workout => byPhase(workout) && bySpecialty(workout) && byType(workout)
      );
      this.selectedWorkouts.next(workouts);
      console.log("1 EVERYTHING CHECKED");
    } else if (
      phases.length > 0 &&
      specialties.length > 0 &&
      type.length === 0
    ) {
      const workouts = this.workouts.filter(
        workout => byPhase(workout) && bySpecialty(workout)
      );
      this.selectedWorkouts.next(workouts);
      console.log("2 PHASE AND SPECIALTY (no type)");
    } else if (
      phases.length > 0 &&
      specialties.length === 0 &&
      type.length > 0
    ) {
      const workouts = this.workouts.filter(
        workout => byPhase(workout) && byType(workout)
      );
      this.selectedWorkouts.next(workouts);
      console.log("3 PHASE AND TYPE (no specialty)");
    } else if (
      phases.length > 0 &&
      specialties.length === 0 &&
      type.length === 0
    ) {
      const workouts = this.workouts.filter(workout => byPhase(workout));
      this.selectedWorkouts.next(workouts);
      console.log("4 PHASE ONLY (no type or specialty)");
    } else if (
      phases.length === 0 &&
      specialties.length > 0 &&
      type.length > 0
    ) {
      const workouts = this.workouts.filter(
        workout => bySpecialty(workout) && byType(workout)
      );
      this.selectedWorkouts.next(workouts);
      console.log("5 SPECIALTY AND TYPE (no phase)");
    } else if (
      phases.length === 0 &&
      specialties.length > 0 &&
      type.length === 0
    ) {
      const workouts = this.workouts.filter(workout => bySpecialty(workout));
      this.selectedWorkouts.next(workouts);
      console.log("6 SPECIALTY ONLY (no phase nor type)");
    } else if (
      phases.length === 0 &&
      specialties.length === 0 &&
      type.length > 0
    ) {
      const workouts = this.workouts.filter(workout => byType(workout));
      this.selectedWorkouts.next(workouts);
      console.log("7 TYPE ONLY (no phase nor specialty)");
    }
  }
}
