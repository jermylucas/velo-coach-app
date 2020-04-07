import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

import { AuthService } from "./auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  currentUser: BehaviorSubject<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.currentUser = new BehaviorSubject(this.firebaseAuth.auth.currentUser);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  updateUser(name: string) {
    return this.firebaseAuth.auth.currentUser
      .updateProfile({
        displayName: name,
      })
      .then(
        () => {
          // console.log("updated name");
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
