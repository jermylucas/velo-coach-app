// @Angular imports
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Services
import { LocalStorageService } from "../../services/local-storage.service";

// Components
import { WorkoutsListComponent } from "../../features/workouts-page/workouts/workouts-list/workouts-list.component";
import { WorkoutsFilterComponent } from "../../features/workouts-page/workouts/workouts-filter/workouts-filter.component";
import { WorkoutDetailComponent } from "../../features/workouts-page/workout-detail/workout-detail.component";
import { WorkoutsComponent } from "../../features/workouts-page/workouts/workouts-page.component";
import { WorkoutEditComponent } from "../../features/workouts-page/workout-edit/workout-edit.component";

// WYSIWYG
import { AngularEditorModule } from "@kolkov/angular-editor";

// Routing
import { WorkoutsRoutingModule } from "./workouts-routing.module";
// Modules
import { MaterialModule } from "../../../app/material.module";
import { SharedModule } from "../../../app/shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    WorkoutsComponent,
    WorkoutEditComponent,
    WorkoutsListComponent,
    WorkoutsFilterComponent,
    WorkoutDetailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    WorkoutsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [LocalStorageService]
})
export class WorkoutsModule {}