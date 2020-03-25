import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkoutsComponent } from "../../features/workouts-page/workouts/workouts-page.component";
import { WorkoutEditComponent } from "../../features/workouts-page/workout-edit/workout-edit.component";
import { WorkoutDetailComponent } from "../../features/workouts-page/workout-detail/workout-detail.component";
import { WorkoutResolver } from "./workout-resolver.service";

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
