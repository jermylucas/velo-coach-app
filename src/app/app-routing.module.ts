import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/workouts", pathMatch: "full" },
  {
    path: "workouts",
    component: WorkoutsComponent
    // Add these later when I have more components for children to workouts
    //
    // children: [
    //   { path: 'new', component: NewWorkoutComponent},
    //   {
    //     path: ':id',
    //     component: WorkoutDetailComponent
    //     resolve: [WorkoutResolverService]
    //   },
    //   { path: ':id/edit',
    //     component: WorkoutEditComponent,
    //     resolve: [WorkoutResolverService]
    // }
    // ]
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
