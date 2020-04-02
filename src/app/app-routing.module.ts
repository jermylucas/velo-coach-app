import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { SelectiveStrategy } from "./selective-strategy.service";
import { AuthComponent } from "./core/auth/auth.component";
import { AuthGuard } from "./core/auth/auth.guard";

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
    canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: () =>
      import("./features/workouts/workouts.module").then(m => m.WorkoutsModule)
  },
  {
    path: "trainingplans",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/training-plans/training-plans.module").then(
        m => m.TrainingPlansModule
      )
  },
  {
    path: "account",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/account/account.module").then(m => m.AccountModule)
  },
  { path: "auth", component: AuthComponent },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
