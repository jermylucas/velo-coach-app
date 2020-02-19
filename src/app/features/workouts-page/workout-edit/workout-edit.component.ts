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
      console.log(
        "Edit Mode... ID: ",
        this.id,
        ".. Value: ",
        this.workoutForm.value
      );
    } else {
      console.log("Not Edit Mode... Submit workout: ", this.workoutForm.value);
    }
  }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   const newWorkout = new Workout(
  //     value.title,
  //     value.description,
  //     value.imgPath,
  //     value.type,
  //     value.duration,
  //     value.specialty,
  //     value.phase,
  //     value.zwo
  //   );

  //   this.workoutService.addWorkout(newWorkout);
  //   this.workoutService;
  //   this.onCancel();
  //   this.dataStorage.storeWorkouts();
  // }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let workoutImgPath = "";
    let workoutTitle = "";

    if (this.editMode) {
      const workout = this.workoutService.getWorkout(this.id);
      workoutTitle = workout.title;
      workoutImgPath = workout.imagePath;

      console.log(workout);
    }

    this.workoutForm = new FormGroup({
      title: new FormControl(workoutTitle, Validators.required),
      imgPath: new FormControl(workoutImgPath, Validators.required)
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
