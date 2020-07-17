import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../../auth/user.model';
import { LocalStorageService } from '../storage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  activeUser = new BehaviorSubject<User>(null);
  user: Observable<firebase.User>;
  private tokenExpirationTimer: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string, name: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then((res) => {
      res.user.updateProfile({
        displayName: name,
      });
      res.user.getIdToken(true).then((token) => {
        this.handleAuthentication(res.user.email, res.user.uid, res.user.displayName, token, 3600);
      });

      return res;
    });
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then((res) => {
      res.user.getIdToken(true).then((token) => {
        this.handleAuthentication(res.user.email, res.user.uid, res.user.displayName, token, 3600);
      });
      return res;
    });
  }

  autoLogin() {
    const userData: {
      email: string;
      uid: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: number;
    } = JSON.parse(this.localStorage.getItemLocally('userData'));
    if (userData == null) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.uid,
      userData.displayName,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.activeUser.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['/auth']);
    this.activeUser.next(null);
    this.localStorage.removeLocalItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, uid: string, displayName: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, uid, displayName, token, expirationDate);
    this.activeUser.next(user);
    this.autoLogout(expiresIn * 1000);
    this.localStorage.setItemLocally('userData', JSON.stringify(user));
  }
}
