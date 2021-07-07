import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngxs/store';
import firebase from 'firebase/app';
import { FetchWorkouts } from 'src/app/features/workouts/workout.state';
import { SetUser, User } from '../components/auth/user.state';
import { LocalStorageService } from './storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  isLoggedIn = false;
  constructor(
    public fireAuth: AngularFireAuth,
    private localStorage: LocalStorageService,
    private store: Store
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
        console.log('User login res', res);
        this.store.dispatch(new SetUser(res as any));
        this.isLoggedIn = true;
        this.localStorage.setItemLocally('userData', JSON.stringify(res.user));
      });
  }

  autoLogin() {
    const userData: {
      email: string;
      uid: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: number;
    } = JSON.parse(this.localStorage.getItemLocally('userData') as any);
    if (userData == null) {
      return;
    }
    const loadedUser: User = {
      email: userData.email,
      id: userData.uid,
      displayName: userData.displayName,
      _token: userData._token,
      _tokenExpirationDate: new Date(userData._tokenExpirationDate),
    };
    this.store.dispatch(new SetUser(loadedUser));
    // if (loadedUser.token) {
    //   this.activeUser.next(loadedUser);
    //   const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //   this.autoLogout(expirationDuration);
    // }
  }

  logout() {
    this.fireAuth.signOut();
    this.localStorage.removeLocalItem('userData');
    this.store.dispatch(new FetchWorkouts());
  }
}
