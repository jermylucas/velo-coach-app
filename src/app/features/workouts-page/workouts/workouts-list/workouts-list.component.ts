import { Component, OnInit } from "@angular/core";
import { Workout } from "../workout.model";
import { WorkoutService } from "../../workoutservice/workout.service";

@Component({
  selector: "app-workouts-list",
  templateUrl: "./workouts-list.component.html",
  styleUrls: ["./workouts-list.component.scss"]
})
export class WorkoutsListComponent implements OnInit {
  workouts: any;
  // workouts: Workout[] = [
  //   new Workout(
  //     "SS7-2",
  //     `Chin up dumbbell weightlifting legs, upper back running bounce gym training cardio endurance fit. Arm Smith machine tuck sit, train calves pushup lower body equipment equipment fitness muscles jacks bodyweight. Bounce leg press barbell, curl bodyweight training pushup push warm up cardio extension chin up. Fitness pulldown lunge arm heart rate fitness bounce bodyweight. Chin up running jump, squat body composition body fat percentage bodyweight raise burpees leg press lats arm.`,
  //     "../../../../assets/img/placeholder.png",
  //     "Anaerobic",
  //     20,
  //     "road race",
  //     "Base",
  //     false
  //   ),
  //   new Workout(
  //     "SS6-3",
  //     `Climp chin up tuck jacks warm up body fat percentage ball pulldown, physical chin up lower body gym. Walking raise legs leg press climp stretch barbell ball. Smith machine plank dip muscles bench BMI raise, deadlift major lower body leg major lower back abs. Chest fly gym pectorals crunch endurance, barbell warm up leg press endurance climp. Running pushup stretch pull extension body fat percentage lower body kettlebell calves.`,
  //     "../../../../assets/img/placeholder.png",
  //     "Aerobic",
  //     10,
  //     "Mountain Biking",
  //     "Build",
  //     true
  //   ),
  //   new Workout(
  //     "Name",
  //     "Curl tuck flexibility calves climp curl, lower body pullup physical squat dip pectorals kettlebell equipment. Bear crawl aerobic physical burpees upright row train plank, endurance ball bodyweight jacks mountain climber. Body composition mountain climber legs chin up, jump fit plank body fat percentage kick burpees biceps plank physical barbell. ",
  //     "../../../assets/img/placeholder.png",
  //     "Sprint",
  //     60,
  //     "Road Biking",
  //     "Race",
  //     true
  //   )
  // ];

  constructor(private workoutService: WorkoutService) {
    this.workoutService.getWorkouts().subscribe(res => {
      this.workouts = res;
      console.log("List Comp: ", this.workouts);
    });
  }

  ngOnInit() {}
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
