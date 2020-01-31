import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkoutsComponent } from "./features/workouts/workouts.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WorkoutEditComponent } from "./features/workouts/workout-edit/workout-edit.component";
import { TrainingPlansComponent } from "./features/training-plans/training-plans.component";

const routes: Routes = [
  { path: "", redirectTo: "/workouts", pathMatch: "full" },
  {
    path: "workouts",
    component: WorkoutsComponent
    // This might not be a child... so check when components are made if the edits need to be done as a child or as a seperate component
    //
    // children: [
    //
    //   {
    //   path: ':id',
    //     component: WorkoutDetailComponent
    //     resolve: [WorkoutResolverService]
    //   },
    //   { path: ':id/edit',
    //     component: WorkoutEditComponent,
    //     resolve: [WorkoutResolverService]
    // }
    // ]
  },
  { path: "workouts/new", component: WorkoutEditComponent },
  { path: "trainingplans", component: TrainingPlansComponent },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
