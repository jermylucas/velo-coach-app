import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "workouts",
    loadChildren: () =>
      import("./features/workouts-page/workouts.module").then(
        m => m.WorkoutsModule
      )
  },
  {
    path: "trainingplans",
    loadChildren: () =>
      import("./features/training-plans/training-plans.module").then(
        m => m.TrainingPlansModule
      )
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
