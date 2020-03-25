// @Angular imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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

////// Firebase
import { AngularFireModule } from "@angular/fire";
//storage
import { AngularFireStorageModule } from "@angular/fire/storage";
//database
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../../../environments/environment";

import { WorkoutsRoutingModule } from "./workouts-routing.module";

import { MaterialModule } from "src/app/material.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

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
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [LocalStorageService]
})
export class WorkoutsModule {}
