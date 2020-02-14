import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

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
import { WorkoutsFilterComponent } from "./features/workouts-page/workouts/workouts-filter/workouts-filter.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WorkoutDetailComponent } from "./features/workouts-page/workout-detail/workout-detail.component";

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
    WorkoutsFilterComponent,
    WorkoutDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule {}
