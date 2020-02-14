import { Component, OnInit } from "@angular/core";
import { NgForm, FormControl } from '@angular/forms';
import { WorkoutService } from '../workoutservice/workout.service';
import { Workout } from '../workouts/workout.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-workout-edit",
  templateUrl: "./workout-edit.component.html",
  styleUrls: ["./workout-edit.component.scss"]
})
export class WorkoutEditComponent implements OnInit {
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(private workoutService: WorkoutService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const newWorkout = new Workout(value.title, value.description, value.imgPath, value.type, value.duration, value.specialty, value.phase, value.zwo);

    this.workoutService.addWorkout(newWorkout);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}

  // title: string,
  // description: string,
  // imagePath: string,
  // type: string,
  // duration: number,
  // specialty: string[],
  // phase: string[],
  // zwo: boolean