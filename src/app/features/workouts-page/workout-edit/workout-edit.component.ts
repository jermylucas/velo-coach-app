import { Component, OnInit } from "@angular/core";
import {
  NgForm,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { WorkoutService } from "../workoutservice/workout.service";
import { Workout } from "../workouts/workout.model";
import { Router, ActivatedRoute, Params } from "@angular/router";

// WYSIWYG
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DataStorageService } from "src/app/services/datastorage.service";

@Component({
  selector: "app-workout-edit",
  templateUrl: "./workout-edit.component.html",
  styleUrls: ["./workout-edit.component.scss"]
})
export class WorkoutEditComponent implements OnInit {
  id: number;
  editMode = false;
  workoutForm: FormGroup;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService
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
      console.log("In Edit Mode. Workout updated: ", this.workoutForm.value);
      this.workoutService.updateWorkout(this.id, this.workoutForm.value);
      this.onCancel();
    } else {
      this.workoutService.addWorkout(this.workoutForm.value);
      console.log("Not Edit Mode... Workout Added: ", this.workoutForm.value);
      this.onCancel();
    }
    return;
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let workoutImagePath = "";
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
      workoutImagePath = workout.imagePath;

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
      imagePath: new FormControl(workoutImagePath, Validators.required),
      phase: new FormControl(workoutPhase, Validators.required),
      duration: new FormControl(workoutDuration, Validators.required),
      type: new FormControl(workoutType, Validators.required),
      specialty: new FormControl(workoutSpecialty, Validators.required),
      zwo: new FormControl(workoutZwo, Validators.required),
      description: new FormControl(workoutDescription, Validators.required)
    });
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
    defaultFontName: "Arial",
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
