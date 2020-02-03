import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./components/header/header.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { WorkoutsComponent } from "./features/workouts-page/workouts/workouts-page.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WorkoutEditComponent } from "./features/workouts-page/workout-edit/workout-edit.component";
import { TrainingPlansComponent } from "./features/training-plans/training-plans.component";
import { SidenavService } from "./services/sidenav.service";
import { WorkoutsListComponent } from "./features/workouts-page/workouts/workouts-list/workouts-list.component";
import { WorkoutsItemComponent } from "./features/workouts-page/workouts/workouts-item/workouts-item.component";
import { WorkoutsFilterComponent } from "./features/workouts-page/workouts/workouts-filter/workouts-filter.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    WorkoutsComponent,
    PageNotFoundComponent,
    WorkoutEditComponent,
    TrainingPlansComponent,
    WorkoutsListComponent,
    WorkoutsItemComponent,
    WorkoutsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule {}
