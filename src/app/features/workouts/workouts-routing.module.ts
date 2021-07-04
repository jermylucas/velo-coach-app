import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './workouts.component';
import { WorkoutDetailComponent } from '../workouts/workout-detail/workout-detail.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';

const routes: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutEditComponent },
  {
    path: ':id',
    component: WorkoutDetailComponent,
  },
  {
    path: ':id/edit',
    component: WorkoutEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsRoutingModule {}
