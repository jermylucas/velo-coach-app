import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "workouts",
    loadChildren: () =>
      import("./features/workouts/workouts.module").then(m => m.WorkoutsModule)
  },
  {
    path: "trainingplans",
    loadChildren: () =>
      import("./features/training-plans/training-plans.module").then(
        m => m.TrainingPlansModule
      )
  },
  {
    path: "account",
    loadChildren: () =>
      import("./features/account/account.module").then(m => m.AccountModule)
  },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
