import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

export interface AppStateModel {}

@State<AppStateModel>({
  name: 'app',
})
@Injectable()
export class AppState {
  constructor() {}
}
