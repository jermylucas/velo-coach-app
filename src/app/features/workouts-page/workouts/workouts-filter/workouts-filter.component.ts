import { Component, OnInit } from "@angular/core";
import { WorkoutService } from "../../workoutservice/workout.service";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-workouts-filter",
  templateUrl: "./workouts-filter.component.html",
  styleUrls: ["./workouts-filter.component.scss"]
})
export class WorkoutsFilterComponent implements OnInit {
  apply = false;

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
  typeOptions = [
    "Anaerobic",
    "Aerobic / Endurance",
    "Muscular Endurance",
    "Power",
    "Sweet Spot",
    "Strength",
    "Technique",
    "Tempo",
    "Threshold"
  ];

  phaseSelection = new SelectionModel<string>(true);
  specialtySelection = new SelectionModel<string>(true);
  typeSelection = new SelectionModel<string>(true);

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {}

  applyFilter() {
    this.workoutService.filterWorkouts(
      this.phaseSelection.selected,
      this.specialtySelection.selected,
      this.typeSelection.selected
    );
  }
}
