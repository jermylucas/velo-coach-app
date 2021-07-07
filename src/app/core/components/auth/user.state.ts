import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

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
  uid: string;
  displayName: string;
}

export class UserStateModel {
  user: UserProfile | null;
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
    user: null,
    _token: null,
    _tokenExpirationDate: null,
  },
})
@Injectable()
export class UserState {
  constructor(private authService: FirebaseAuthService) {}

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
  }

  @Action(FetchUser)
  fetchUser(ctx: StateContext<UserStateModel>, { email, password }: any) {
    return this.authService.login(email, password).then((res) => {
      console.log('User from state', res);
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
    console.log('DISPATCHED');
    return this.authService.signup(email, password, name).then((res) => {
      console.log('User from state', res);
      ctx.setState(
        patch<UserStateModel>({
          user: res as any,
        })
      );
    });
  }

  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, { payload }: any) {
    ctx.setState(
      patch<UserStateModel>({
        user: payload as UserProfile,
      })
    );
  }
}
