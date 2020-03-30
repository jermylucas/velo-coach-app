// @Angular imports
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Services
import { LocalStorageService } from "../../core/services/storage/local-storage.service";

// Components
import { WorkoutsListComponent } from "./workouts-list/workouts-list.component";
import { WorkoutsFilterComponent } from "./workouts-filter/workouts-filter.component";
import { WorkoutDetailComponent } from "../workouts/workout-detail/workout-detail.component";
import { WorkoutsComponent } from "../workouts/workouts.component";
import { WorkoutEditComponent } from "../workouts/workout-edit/workout-edit.component";

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
