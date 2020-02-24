// @Angular imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./components/header/header.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { WorkoutsComponent } from "./features/workouts-page/workouts/workouts-page.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WorkoutEditComponent } from "./features/workouts-page/workout-edit/workout-edit.component";
import { TrainingPlansComponent } from "./features/training-plans/training-plans.component";
import { SidenavService } from "./services/sidenav.service";
import { LocalStorageService } from "./services/local-storage.service";

import { WorkoutsListComponent } from "./features/workouts-page/workouts/workouts-list/workouts-list.component";
import { WorkoutsFilterComponent } from "./features/workouts-page/workouts/workouts-filter/workouts-filter.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner.component";

import { WorkoutDetailComponent } from "./features/workouts-page/workout-detail/workout-detail.component";

// WYSIWYG
import { AngularEditorModule } from "@kolkov/angular-editor";

////// Firebase
import { AngularFireModule } from "@angular/fire";
//storage
import { AngularFireStorageModule } from "@angular/fire/storage";
//database
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

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
    WorkoutDetailComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [SidenavService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
