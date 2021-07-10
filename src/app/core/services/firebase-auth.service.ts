import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ClearWorkouts } from 'src/app/features/workouts/workout.state';
import { ClearUser, SetUser, User } from '../components/auth/user.state';
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

  login(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        this.store.dispatch(new SetUser(res.user));
        this.isLoggedIn = true;
        this.localStorage.setItemLocally('userData', JSON.stringify(res.user));
      });
  }

  signup(email: string, password: string, name: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user
          ?.updateProfile({
            displayName: name,
          })
          .then(() => {
            this.user.pipe(first()).subscribe((res) => {
              this.isLoggedIn = true;
              this.localStorage.setItemLocally('userData', JSON.stringify(res));
              this.store.dispatch(new SetUser(res));
            });
          });
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
      uid: userData.uid,
      displayName: userData.displayName,
      _token: userData._token,
      _tokenExpirationDate: new Date(userData._tokenExpirationDate),
    };
    this.store.dispatch(new SetUser(loadedUser as any));
  }

  logout() {
    this.fireAuth.signOut();
    this.localStorage.removeLocalItem('userData');
    this.store.dispatch([new ClearUser(), new ClearWorkouts()]);
    this.router.navigate(['/auth']);
  }
}
