import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { LocalStorageService } from './storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  isLoggedIn = false;
  constructor(
    public fireAuth: AngularFireAuth,
    private localStorage: LocalStorageService
  ) {}

  async signup(email: string, password: string, name: string) {
    await this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user?.updateProfile({
          displayName: name,
        });
        this.isLoggedIn = true;
        console.log('res', res);
        console.log('User', res.user);
        this.localStorage.setItemLocally('userData', JSON.stringify(res.user));
      });
  }

  async login(email: string, password: string) {
    // sign in
    await this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        this.localStorage.setItemLocally('userData', JSON.stringify(res.user));
      });
  }

  autoLogin() {
    // const userData: {
    //   email: string;
    //   uid: string;
    //   displayName: string;
    //   _token: string;
    //   _tokenExpirationDate: number;
    // } = JSON.parse(this.localStorage.getItemLocally('userData'));
    // if (userData == null) {
    //   return;
    // }
    // const loadedUser = new User(
    //   userData.email,
    //   userData.uid,
    //   userData.displayName,
    //   userData._token,
    //   new Date(userData._tokenExpirationDate)
    // );
    // if (loadedUser.token) {
    //   this.activeUser.next(loadedUser);
    //   const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //   this.autoLogout(expirationDuration);
    // }
  }

  logout() {
    this.fireAuth.signOut();
    this.localStorage.removeLocalItem('userData');
  }
}
