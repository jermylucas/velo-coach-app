import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkoutsComponent } from "./workouts.component";
import { WorkoutEditComponent } from "../workouts/workout-edit/workout-edit.component";
import { WorkoutDetailComponent } from "../workouts/workout-detail/workout-detail.component";
import { WorkoutResolver } from "./workouts-resolver.service";

const routes: Routes = [
  { path: "", component: WorkoutsComponent },
  { path: "new", component: WorkoutEditComponent },
  {
    path: ":id",
    component: WorkoutDetailComponent,
    resolve: { resolveData: WorkoutResolver }
  },
  {
    path: ":id/edit",
    component: WorkoutEditComponent,
    resolve: { resolveData: WorkoutResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule {}
