import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { WorkoutService } from '../services/workout.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-workouts-filter',
  templateUrl: './workouts-filter.component.html',
  styleUrls: ['./workouts-filter.component.scss'],
})
export class WorkoutsFilterComponent implements OnInit {
  apply = false;

  // Filter groups
  phaseOptions = [
    'Base 1',
    'Base 2',
    'Base 3',
    'Build 1',
    'Build 2',
    'Recovery',
    'Peak',
    'Race',
    'Testing',
    'Strength Build',
    'Strength Maint.',
  ];
  specialtyOptions = [
    'Road Race',
    'Criterium',
    'Hill Climb',
    'Cyclocross',
    'Gravel',
    'Time Trial',
    'Cross Country MTB',
    'Gym Work',
  ];
  durationOptions = [1, 2, 3, 4, 10];
  typeOptions = [
    'Anaerobic',
    'Aerobic / Endurance',
    'Muscular Endurance',
    'Power',
    'Sweet Spot',
    'Strength',
    'Technique',
    'Tempo',
    'Threshold',
    'Vo2 Max',
  ];
  zwoOptions = ['Yes', 'No'];

  phaseSelection = new SelectionModel<string>(true);
  specialtySelection = new SelectionModel<string>(true);
  durationSelection = new SelectionModel<number>(true);
  typeSelection = new SelectionModel<string>(true);
  zwoSelection = new SelectionModel<string>(true);

  constructor(private workoutService: WorkoutService, private store: Store) {}

  ngOnInit() {}

  applyFilter() {
    this.workoutService.filterWorkouts(
      this.phaseSelection.selected,
      this.specialtySelection.selected,
      this.durationSelection.selected,
      this.typeSelection.selected,
      this.zwoSelection.selected
    );
  }
}

// Less than 30min
// 30 &mdash; 60min
// 60 &mdash; 90min
// 90min &mdash; 2hrs
// 2 &mdash; 3hrs
