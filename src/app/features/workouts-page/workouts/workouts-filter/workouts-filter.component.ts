import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { WorkoutService } from "../../workoutservice/workout.service";

@Component({
  selector: "app-workouts-filter",
  templateUrl: "./workouts-filter.component.html",
  styleUrls: ["./workouts-filter.component.scss"]
})
export class WorkoutsFilterComponent implements OnInit {
  // Filter groups
  phaseOptions = [
    "Base 1",
    "Base 2",
    "Base 3",
    "Build 1",
    "Build 2",
    "Recovery",
    "Peak",
    "Race",
    "Testing"
  ];
  specialtyOptions = [
    "Road Race",
    "Hill Climb",
    "Cyclocross",
    "Gravel",
    "Time Trial",
    "Cross Country MTB"
  ];
  // Create Form
  filterForm: FormGroup;

  phaseCheckboxes: FormGroup;
  specialtyCheckboxes: FormGroup;

  // Arrays to hold checked values
  phaseWorkoutFilter = [];
  specialtyWorkoutFilter = [];

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    // Make Form Groups
    this.phaseCheckboxes = this.fb.group({});
    this.phaseOptions.forEach((option: any) => {
      this.phaseCheckboxes.addControl(option, new FormControl(false));
    });
    this.specialtyCheckboxes = this.fb.group({});
    this.specialtyOptions.forEach((option: any) => {
      this.specialtyCheckboxes.addControl(option, new FormControl(false));
    });

    // Initialize Form
    this.filterForm = this.fb.group({
      phaseCheckboxes: this.phaseCheckboxes,
      specialtyCheckboxes: this.specialtyCheckboxes
    });
  }

  onSubmit() {
    // Set arrays to be empty
    this.phaseWorkoutFilter = [];
    this.specialtyWorkoutFilter = [];

    // Add values to array
    const phaseCheckboxValues = this.filterForm.value.phaseCheckboxes;
    const specialtyCheckboxValues = this.filterForm.value.specialtyCheckboxes;

    // Put items into an array instead of as a "true"/"false"

    // Phases Group
    this.phaseWorkoutFilter = Object.entries(phaseCheckboxValues)
      .filter(([_, checked]) => checked)
      .map(([key]) => key);
    // Specialty Group
    this.specialtyWorkoutFilter = Object.entries(specialtyCheckboxValues)
      .filter(([_, checked]) => checked)
      .map(([key]) => key);

    // View Results of Checkboxes
    console.log(this.phaseWorkoutFilter);

    this.workoutService.filterWorkouts(this.phaseWorkoutFilter);
  }

  // View True/False values
  // console.log(phaseCheckboxValues);
  // console.log(specialtyCheckboxValues);
}
