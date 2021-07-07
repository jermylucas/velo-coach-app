import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { LocalStorageService } from '../../services/storage/local-storage.service';

export interface User {
  email: string;
  id: string;
  displayName: string;
  // tslint:disable: variable-name
  _token;
  _tokenExpirationDate: Date;
}

export interface UserProfile {
  email: string;
  id: string;
  displayName: string;
}

export class UserStateModel {
  user: UserProfile | undefined;
  _token: string | null;
  _tokenExpirationDate: number | null;
}

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

export class SetToken {
  static readonly type = '[User] SetToken';
  constructor(public token: string) {}
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
    _token: null,
    _tokenExpirationDate: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private authService: FirebaseAuthService,
    private localStorage: LocalStorageService
  ) {}

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
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

  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, { payload }: any) {
    ctx.setState(
      patch<UserStateModel>({
        user: {
          email: payload.email,
          id: payload.id,
          displayName: payload.displayName,
        },
      })
    );
  }
}
