import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { WorkoutService } from '../features/workouts-page/workoutservice/workout.service';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http: HttpClient, private workoutService: WorkoutService) { }

  storeWorkouts() {
    const workouts = this.workoutService.getAllWorkouts();
    // this.http.put('https://ng-recipe-book-17706.firebaseio.com/recipes.json', workouts).subscribe(response =>
    // console.log(response));
    console.log(workouts);
  }

}
