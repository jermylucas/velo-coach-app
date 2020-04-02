import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable, BehaviorSubject } from "rxjs";

import { User } from "../../auth/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  activeUser = new BehaviorSubject<User>(null);
  user: Observable<firebase.User>;
  name;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string, name: string) {
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: name
        });
        res.user.getIdToken(true).then(token => {
          this.handleAuthentication(
            res.user.email,
            res.user.uid,
            res.user.displayName,
            token,
            3600
          );
        });

        return res;
      });
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        res.user.getIdToken(true).then(token => {
          this.handleAuthentication(
            res.user.email,
            res.user.uid,
            res.user.displayName,
            token,
            3600
          );
        });
        return res;
      });
  }

  private handleAuthentication(
    email: string,
    uid: string,
    displayName: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, uid, displayName, token, expirationDate);
    this.activeUser.next(user);

    this.name = displayName;
    console.log(user);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }
}
