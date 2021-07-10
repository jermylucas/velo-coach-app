import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { first } from 'rxjs/operators';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { LocalStorageService } from '../../services/storage/local-storage.service';

export interface User {
  email: string | undefined;
  uid: string | undefined;
  displayName: string | undefined;
  // tslint:disable: variable-name
  _token;
  _tokenExpirationDate: Date;
}

export interface UserProfile {
  email: string;
  uid: string;
  displayName: string;
}

export class UserStateModel {
  user: any;
  _token: string | null;
  _tokenExpirationDate: number | null;
  loading: boolean;
}

export const userStateDefaults = {
  user: {
    email: undefined,
    displayName: undefined,
    uid: undefined,
  },
  _token: null,
  _tokenExpirationDate: null,
  loading: false,
};

export class FetchUser {
  static readonly type = '[User] FetchUser';
  constructor(public email: string, public password: string) {}
}

export class CreateUser {
  static readonly type = '[User] CreateUser';
  constructor(
    public email: string,
    public password: string,
    public name: string
  ) {}
}

export class SetUser {
  static readonly type = '[User] SetUser';
  constructor(public payload: UserProfile) {}
}

export class UpdateUser {
  static readonly type = '[User] UpdateUser';
  constructor(public payload: UserProfile) {}
}

export class SetToken {
  static readonly type = '[User] SetToken';
  constructor(public token: string) {}
}

export class ClearUser {
  static readonly type = '[User] ClearUser';
}

@State<UserStateModel>({
  name: 'user',
  defaults: userStateDefaults,
})
@Injectable()
export class UserState {
  constructor(
    private authService: FirebaseAuthService,
    private fireAuth: AngularFireAuth,
    private localStorage: LocalStorageService
  ) {}

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
  }
  @Selector()
  static loading(state: UserStateModel) {
    return state.loading;
  }

  @Action(FetchUser)
  fetchUser(ctx: StateContext<UserStateModel>, { email, password }: any) {
    return this.authService.login(email, password).then((res) => {
      ctx.setState(
        patch<UserStateModel>({
          user: res as any,
        })
      );
    });
  }

  @Action(CreateUser)
  createUser(
    ctx: StateContext<UserStateModel>,
    { email, password, name }: any
  ) {
    // return this.authService.signup(email, password, name).then((res: any) => {
    //   // console.log('User from state', res);
    //   ctx.dispatch(new SetUser(res.user));
    // });
  }

  @Action(UpdateUser)
  async updateUser(ctx: StateContext<UserStateModel>, { payload }: any) {
    // Payload has anything that comes from the accountform
    // as of now only changing the displayname...
    return (await this.fireAuth.currentUser)!
      .updateProfile({
        displayName: payload.displayName,
      })
      .then(() => {
        this.fireAuth.user.pipe(first()).subscribe((res) => {
          ctx.dispatch(new SetUser(res as any));
          this.localStorage.removeLocalItem('userData');
          this.localStorage.setItemLocally('userData', JSON.stringify(res));
        });
      });
  }

  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, { payload }: any) {
    ctx.setState(
      patch<UserStateModel>({
        user: {
          email: payload.email,
          uid: payload.uid,
          displayName: payload.displayName,
        },
        loading: false,
      })
    );
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<UserStateModel>) {
    ctx.setState(userStateDefaults);
  }
}
