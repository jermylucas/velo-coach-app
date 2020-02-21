import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { WorkoutService } from "../workoutservice/workout.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

// WYSIWYG
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DataStorageService } from "src/app/services/datastorage.service";
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
  id: number;
  editMode = false;
  imgSrc = "../../../../assets/img/placeholder.png";
  selectedImage: any = null;
  isLoading = false;

  workoutForm: FormGroup;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.workoutService.updateWorkout(this.id, this.workoutForm.value);
      this.onCancel();
      //store workouts
      this.dataStorage.storeWorkouts();
    } else {
      if (this.workoutForm.valid) {
        this.isLoading = true;

        console.log(
          "complete form before image upload: ",
          this.workoutForm.value
        );
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
                console.log("uploaded from: ", this.workoutForm.value.imageUrl);
                console.log("new url: ", url);
                this.workoutForm.value.imageUrl = url;
                this.isLoading = false;
                this.workoutService.addWorkout(this.workoutForm.value);

                this.resetForm();

                this.onCancel();

                // store workouts
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

  resetForm() {
    this.workoutForm.reset();
    console.log("Form is reset here... ");
    this.selectedImage = null;
    this.imgSrc = "../../../../assets/img/placeholder.png";
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let workoutImageUrl = "";
    let workoutTitle = "";
    let workoutPhase = [];
    let workoutType = "";
    let workoutDuration = "";
    let workoutSpecialty = [];
    let workoutDescription = "";
    let workoutZwo = "";

    if (this.editMode) {
      const workout = this.workoutService.getWorkout(this.id);
      workoutTitle = workout.title;
      workoutImageUrl = workout.imageUrl;

      workoutPhase = workout.phase;
      workoutType = workout.type;
      workoutDuration = workout.duration;
      workoutSpecialty = workout.specialty;
      workoutZwo = workout.zwo;
      workoutDescription = workout.description;

      console.log(workout);
    }

    this.workoutForm = new FormGroup({
      title: new FormControl(workoutTitle, Validators.required),
      imageUrl: new FormControl(workoutImageUrl, Validators.required),
      phase: new FormControl(workoutPhase, Validators.required),
      duration: new FormControl(workoutDuration, Validators.required),
      type: new FormControl(workoutType, Validators.required),
      specialty: new FormControl(workoutSpecialty, Validators.required),
      zwo: new FormControl(workoutZwo, Validators.required),
      description: new FormControl(workoutDescription, Validators.required)
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const currentImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(currentImage);
      this.selectedImage = currentImage;
    } else {
      this.imgSrc = "../../../../assets/img/placeholder.png";
      this.selectedImage = null;
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
