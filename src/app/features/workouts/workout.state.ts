import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, mergeMap, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';

export class Workout {
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  duration: number;
  specialty: string[];
  phase: string[];
  zwo: string;
}

export interface WorkoutStateModel {
  workouts: Workout[];
  loading: boolean;
}

export class FetchWorkouts {
  static readonly type = '[WorkoutState] FetchWorkouts';
}

export class GetWorkout {
  static readonly type = '[WorkoutState] GetWorkout';
}

export class SaveWorkout {
  static readonly type = '[WorkoutState] SaveWorkout';
  constructor(public payload: Workout) {}
}

export class DeleteWorkout {
  static readonly type = '[WorkoutState] DeleteWorkout';
  constructor(public payload: any) {}
}

export class ResetLoading {
  static readonly type = '[WorkoutState] ResetLoading';
}

@State<WorkoutStateModel>({
  name: 'workout',
  defaults: {
    workouts: [],
    loading: false,
  },
})
@Injectable()
export class WorkoutState {
  workoutsRef: any;
  constructor(private db: AngularFireDatabase) {
    this.workoutsRef = this.db.list('workouts');
  }

  @Selector()
  public static workouts(state: WorkoutStateModel) {
    return state.workouts;
  }
  @Selector()
  public static loading(state: WorkoutStateModel) {
    return state.loading;
  }

  @Action(FetchWorkouts)
  fetchWorkouts(ctx: StateContext<WorkoutStateModel>) {
    ctx.setState(patch<WorkoutStateModel>({ loading: true }));
    return this.workoutsRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }))
      ),
      tap((res: Workout[]) => {
        ctx.setState(
          patch<WorkoutStateModel>({
            workouts: res,
          })
        );
      }),
      mergeMap(() => ctx.dispatch(new ResetLoading()))
    );
  }

  @Action(ResetLoading)
  resetLoading(ctx: StateContext<WorkoutStateModel>) {
    ctx.setState(
      patch<WorkoutStateModel>({
        loading: false,
      })
    );
  }
}
