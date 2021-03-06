import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
// WYSIWYG
import { AngularEditorConfig } from '@kolkov/angular-editor';
// Firebase Storage
import { AngularFireStorage } from '@angular/fire/storage';
// Finalize for upload operator
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkout, UpdateWorkout, WorkoutState } from '../workout.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss'],
})
export class WorkoutEditComponent implements OnInit {
  @ViewChild('modalImageDialog')
  modalImageDialog: TemplateRef<any>;

  id: string;
  editMode = false;
  imgSrc = '';
  selectedImage: any = null;
  isLoading = false;
  imageUrl = '';
  newImage = false;
  replaceImage: boolean;

  workoutForm: FormGroup;

  // Configuration for WYSIWYG Editor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Roboto',
    toolbarHiddenButtons: [
      ['subscript', 'superscript'],
      ['justifyRight'],
      ['justifyFull'],
      ['insertImage'],
      ['insertVideo'],
      ['link'],
      ['unlink'],
      ['backgroundColor'],
      ['customClasses'],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fireStorage: AngularFireStorage,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store // private fireStorageService: FirebaseStorageService
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });

    // Patches workout values to formbuilder
    const workout = this.store.selectSnapshot(WorkoutState.workout)!;
    if (this.editMode) {
      this.workoutForm.patchValue(workout);
      this.imageUrl = workout.imageUrl;
    }
  }

  createForms() {
    this.workoutForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      phase: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['', Validators.required],
      specialty: ['', Validators.required],
      zwo: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.editMode) {
      if (this.workoutForm.valid) {
        this.isLoading = true;
        if (this.newImage) {
          //// Upload Image, upload workoutForm value, and store workouts to dataStorage
          //// Adds date and time to image to avoid duplication
          const filePath = `workout-images/${
            this.selectedImage.name
          }_${new Date().getTime()}`;
          console.log(filePath);
          const fileRef = this.fireStorage.ref(filePath);
          this.fireStorage
            .upload(filePath, this.selectedImage)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  this.workoutForm['imageUrl'] = url;
                  // returns object with imageUrl of what I want
                  this.workoutForm.value.imageUrl = url;
                  this.isLoading = false;
                  this.store.dispatch(
                    new UpdateWorkout(this.id, this.workoutForm.value)
                  );
                  this.resetForm();
                  this.onCancel();
                });
              })
            )
            .subscribe();
        } else {
          this.store.dispatch(
            new UpdateWorkout(this.id, this.workoutForm.value)
          );
          this.resetForm();
          this.onCancel();
        }
        return;
      }
    } else {
      if (this.workoutForm.valid) {
        this.isLoading = true;
        // Upload Image, upload workoutForm value, and store workouts to dataStorage
        // Adds date and time to avoid duplication
        const filePath = `workout-images/${
          this.selectedImage.name
        }_${new Date().getTime()}`;
        const fileRef = this.fireStorage.ref(filePath);
        this.fireStorage
          .upload(filePath, this.selectedImage)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.workoutForm['imageUrl'] = url;
                // returns object with imageUrl of what I want
                this.workoutForm.value.imageUrl = url;
                this.isLoading = false;
                this.store.dispatch(new CreateWorkout(this.workoutForm.value));
                // this.workoutService.addWorkout(this.workoutForm.value);
                this.resetForm();
                this.onCancel();
                // this.dataStorage.storeWorkouts();
              });
            })
          )
          .subscribe();
      } else {
        alert('image not valid');
      }
    }
  }

  changeImage() {
    //// Delete image from storage when replace is clicked
    // this.fireStorageService.onDeleteImage(this.imageUrl);

    this.workoutForm.controls['imageUrl'].setErrors({ incorrect: true });
    this.imageUrl = '';
    this.newImage = true;
  }

  resetForm() {
    this.workoutForm.reset();
    this.selectedImage = null;
    this.imgSrc = '';
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onImageChange(event: any) {
    this.workoutForm.controls['imageUrl'].setErrors(null);
    if (event.target.files && event.target.files[0]) {
      const currentImage = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(currentImage);
      this.selectedImage = currentImage;
    } else {
      this.imgSrc = '';
    }
  }

  openModal() {
    this.dialog.open(this.modalImageDialog);
  }
}

// title: string,
// description: string,
// imagePath: string,
// type: string,
// duration: number,
// specialty: string[],
// phase: string[],
// zwo: boolean
