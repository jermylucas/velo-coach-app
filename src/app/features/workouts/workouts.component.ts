import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WorkoutService } from './workouts-service/workout.service';
import { DataStorageService } from '../../core/services/storage/datastorage.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit {
  @Output() navOpen: EventEmitter<any> = new EventEmitter();
  value = '';
  opened = false;

  constructor(private workoutService: WorkoutService, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.onFetchData();
  }

  openNav() {
    if (this.opened) {
      document.getElementById('filter').style.display = 'none';
      this.opened = false;
    } else {
      document.getElementById('filter').style.display = 'block';
      this.opened = true;
    }
  }

  // Sort by events to service
  onTitleSort() {
    this.workoutService.sortByTitle();
  }
  onPhaseSort() {
    this.workoutService.sortByPhase();
  }
  onDurationSort() {
    this.workoutService.sortByDuration();
  }
  onFetchData() {
    this.dataStorageService.fetchWorkouts().subscribe();
  }
}
