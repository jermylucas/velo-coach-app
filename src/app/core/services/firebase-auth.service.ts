import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FetchWorkouts } from 'src/app/features/workouts/workout.state';
import { SetUser, User } from '../components/auth/user.state';
import { LocalStorageService } from './storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  user: Observable<any>;
  isLoggedIn = false;
  constructor(
    public fireAuth: AngularFireAuth,
    private localStorage: LocalStorageService,
    private store: Store,
    private router: Router
  ) {
    this.user = this.fireAuth.authState;
  }

  signup(email: string, password: string, name: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user?.updateProfile({
          displayName: name,
        });
        this.isLoggedIn = true;
        this.localStorage.setItemLocally('userData', JSON.stringify(res.user));
      });
  }

  login(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
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
  }

  logout() {
    this.fireAuth.signOut();
    this.localStorage.removeLocalItem('userData');
    this.router.navigate(['/auth']);
  }
}
