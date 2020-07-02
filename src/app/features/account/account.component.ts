import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  isLoading = false;
  profileSub;
  activeUser;
  editMode = false;

  accountEdit: FormGroup;

  constructor(private profileService: ProfileService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.profileSub = this.profileService.getCurrentUser().subscribe((res) => {
      this.activeUser = res;
    });
    this.accountEdit.patchValue(this.activeUser);
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  createForm() {
    this.accountEdit = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.accountEdit.valid) {
      this.isLoading = true;
      this.profileService.updateUser(this.accountEdit.value.displayName).then(
        () => {
          this.isLoading = false;
          this.onCancel();
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    }
  }

  onCancel() {
    this.editMode = false;
  }
}
