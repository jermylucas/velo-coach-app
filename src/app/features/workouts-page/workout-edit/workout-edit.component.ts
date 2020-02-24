import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { WorkoutService } from "../workoutservice/workout.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { StorageService } from "../../../services/storage.service";

// WYSIWYG
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DataStorageService } from "../../../../app/services/datastorage.service";
//Firebase Storage
import { AngularFireStorage } from "@angular/fire/storage";
// Finalize for upload operator
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-workout-edit",
  templateUrl: "./workout-edit.component.html",
  styleUrls: ["./workout-edit.component.scss"]
})
export class WorkoutEditComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef; //declaration

  id: number;
  editMode = false;
  imgSrc = "";
  selectedImage: any = null;
  isLoading = false;
  imageUrl = "";

  newImage: boolean = false;

  workoutForm: FormGroup;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private storage: AngularFireStorage,
    private fb: FormBuilder
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });
  }

  createForms() {
    this.workoutForm = this.fb.group({
      title: ["", Validators.required],
      imageUrl: ["", Validators.required],
      phase: ["", Validators.required],
      duration: ["", Validators.required],
      type: ["", Validators.required],
      specialty: ["", Validators.required],
      zwo: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.editMode) {
      if (this.workoutForm.valid) {
        this.isLoading = true;

        if (this.newImage) {
          // Upload Image, upload workoutForm value, and store workouts to dataStorage
          // add date and time to image to avoid duplication
          let filePath = `workout-images/${
            this.selectedImage.name
          }_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.storage
            .upload(filePath, this.selectedImage)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                  this.workoutForm["imageUrl"] = url;
                  // returns object with imageUrl of what I want
                  this.workoutForm.value.imageUrl = url;
                  this.isLoading = false;
                  this.workoutService.updateWorkout(
                    this.id,
                    this.workoutForm.value
                  );

                  this.resetForm();

                  this.onCancel();

                  // store workouts
                  this.dataStorage.storeWorkouts();
                });
              })
            )
            .subscribe();
        } else {
          this.workoutService.updateWorkout(this.id, this.workoutForm.value);
          this.resetForm();

          this.onCancel();

          // store workouts
          this.dataStorage.storeWorkouts();
        }
        return;
      }
    } else {
      if (this.workoutForm.valid) {
        this.isLoading = true;

        // Upload Image, upload workoutForm value, and store workouts to dataStorage
        // add date and time to avoid duplication
        let filePath = `workout-images/${
          this.selectedImage.name
        }_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

        this.storage
          .upload(filePath, this.selectedImage)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.workoutForm["imageUrl"] = url;
                // returns object with imageUrl of what I want
                this.workoutForm.value.imageUrl = url;
                this.isLoading = false;
                this.workoutService.addWorkout(this.workoutForm.value);

                this.resetForm();

                this.onCancel();

                this.dataStorage.storeWorkouts();
              });
            })
          )
          .subscribe();
      } else {
        alert("image not valid");
      }
    }
  }

  changeImage() {
    this.workoutForm.controls["imageUrl"].setErrors({ incorrect: true });
    this.imageUrl = "";
    this.newImage = true;
  }

  resetForm() {
    this.workoutForm.reset();
    console.log("Form is reset");
    this.selectedImage = null;
    this.imgSrc = "";
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  showPreview(event: any) {
    this.workoutForm.controls["imageUrl"].setErrors(null);
    if (event.target.files && event.target.files[0]) {
      const currentImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(currentImage);
      this.selectedImage = currentImage;
    } else {
      this.imgSrc = "";
    }
  }

  // Configuration for WYSIWYG Editor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Roboto",
    toolbarHiddenButtons: [
      ["subscript", "superscript"],
      ["justifyRight"],
      ["justifyFull"],
      ["insertImage"],
      ["insertVideo"],
      ["link"],
      ["unlink"],
      ["backgroundColor"],
      ["customClasses"]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };
}

// title: string,
// description: string,
// imagePath: string,
// type: string,
// duration: number,
// specialty: string[],
// phase: string[],
// zwo: boolean
