// @Angular imports
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Services
import { LocalStorageService } from "../../core/services/storage/local-storage.service";

// Components
import { TrainingPlansComponent } from "../training-plans/training-plans.component";

// WYSIWYG
import { AngularEditorModule } from "@kolkov/angular-editor";

////// Firebase
import { AngularFireModule } from "@angular/fire";
//Storage
import { AngularFireStorageModule } from "@angular/fire/storage";
//Database
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../../../environments/environment";
//Modules
import { MaterialModule } from "../../../app/material.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../../app/shared/shared.module";

@NgModule({
  declarations: [TrainingPlansComponent],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    RouterModule.forChild([{ path: "", component: TrainingPlansComponent }])
  ],
  providers: [LocalStorageService]
})
export class TrainingPlansModule {}
