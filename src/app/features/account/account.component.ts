import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  UpdateUser,
  User,
  UserState,
} from '../../core/components/auth/user.state';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Select(UserState.user) user$: Observable<User>;
  @Select(UserState.loading) loading$: Observable<boolean>;

  isLoading = false;
  profileSub;
  activeUser: User;
  editMode = false;

  accountEditForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.user$.subscribe((res) => {
      this.createForm(res);

      if (res) {
        this.activeUser = res;
        this.accountEditForm.patchValue(res);
      }
    });
  }

  createForm(user) {
    this.accountEditForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('submitted');
    if (this.accountEditForm.valid) {
      console.log('valid');
      this.store.dispatch(new UpdateUser(this.accountEditForm.value));
    }
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  onCancel() {
    this.editMode = false;
  }
}
