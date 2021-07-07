import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, mergeMap, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { WorkoutService } from './services/workout.service';
import { UserState } from 'src/app/core/components/auth/user.state';

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

export class FilterOptions {
  phases: string[];
  specialties: string[];
  duration: number[];
  types: string[];
  zwo: string[];
}

export interface WorkoutStateModel {
  workouts: Workout[];
  workout: Workout | null;
  workoutList: Workout[];
  loading: boolean;
}

export class FetchWorkouts {
  static readonly type = '[WorkoutState] FetchWorkouts';
}

export class FilterWorkouts {
  static readonly type = '[WorkoutState] FilterWorkouts';
  constructor(public payload: any) {}
}
export class GetWorkout {
  static readonly type = '[WorkoutState] GetWorkout';
  constructor(public payload: string) {}
}

export class CreateWorkout {
  static readonly type = '[WorkoutState] CreateWorkout';
  constructor(public payload: Workout) {}
}
export class UpdateWorkout {
  static readonly type = '[WorkoutState] UpdateWorkout';
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
    workout: null,
    workoutList: [],
    loading: true,
  },
})
@Injectable()
export class WorkoutState {
  constructor(
    private db: AngularFireDatabase,
    private workoutService: WorkoutService,
    private store: Store
  ) {}

  @Selector()
  public static workouts(state: WorkoutStateModel) {
    return state.workouts;
  }
  @Selector()
  public static workout(state: WorkoutStateModel) {
    return state.workout;
  }
  @Selector()
  public static workoutList(state: WorkoutStateModel) {
    return state.workoutList;
  }
  @Selector()
  public static loading(state: WorkoutStateModel) {
    return state.loading;
  }

  @Action(FetchWorkouts)
  fetchWorkouts(ctx: StateContext<WorkoutStateModel>) {
    const uid = this.store.selectSnapshot(UserState.user)?.uid;
    console.log(uid);
    let workoutsRef = this.db.list(`/workouts/${uid}`);

    // if (uid === undefined) {
    //   workoutsRef = this.db.list('workouts');
    // }

    ctx.setState(patch<WorkoutStateModel>({ loading: true }));
    return workoutsRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }))
      ),
      tap((res: Workout[]) => {
        console.log(res);
        ctx.setState(
          patch<WorkoutStateModel>({
            workouts: res as Workout[],
            workoutList: res as Workout[],
            loading: false,
          })
        );
      }),
      mergeMap(() => ctx.dispatch(new ResetLoading()))
    );
  }

  @Action(GetWorkout)
  getWorkout(ctx: StateContext<WorkoutStateModel>, { payload }: any) {
    const uid = this.store.selectSnapshot(UserState.user)?.uid;
    ctx.setState(patch<WorkoutStateModel>({ loading: true }));
    return this.db
      .object(`workouts/${uid}` + payload)
      .valueChanges()
      .pipe(
        tap((res) => {
          ctx.setState(
            patch<WorkoutStateModel>({
              workout: res as Workout,
              loading: false,
            })
          );
        })
      );
  }

  @Action(FilterWorkouts)
  filterWorkouts(ctx: StateContext<WorkoutStateModel>, { payload }: any) {
    console.log(payload);
    ctx.setState(
      patch<WorkoutStateModel>({
        workoutList: payload,
      })
    );
  }

  @Action(CreateWorkout)
  createWorkout(ctx: StateContext<WorkoutStateModel>, { payload }: any) {
    const uid = this.store.selectSnapshot(UserState.user)?.uid;
    let workoutsRef = this.db.list(`/workouts/${uid}`);
    console.log('Create Workout State', payload);
    return workoutsRef.push(payload);
  }

  //   const state = ctx.getState();
  //   // const workouts = state.workouts.slice();
  //   return this.workoutService.filterWorkouts(phase, specialty, duration, type, zwo)

  // state.workouts.filter((workout: Workout) => {
  //       return (
  //         (!phase.length ||
  //           phase.some((phase) => workout.phase.includes(phase))) &&
  //         (!specialty.length ||
  //           specialty.some((specialty) =>
  //             workout.specialty.includes(specialty)
  //           )) &&
  //         (duration.length === 0 ||
  //           duration.indexOf(workout.duration) >= 0) &&
  //         (type.length === 0 || type.indexOf(workout.type) >= 0) &&
  //         (zwo.length === 0 || zwo.indexOf(workout.zwo) >= 0)
  //       );
  //     }),
  //   })
  // );
  // console.log('Workouts from state', state.workouts);
  // console.log(phase, specialty, duration, type, zwo);
  // workouts.filter((workout: Workout) => {
  //   return (
  //     (!phase.length ||
  //       phase.some((phase) => workout.phase.includes(phase))) &&
  //     (!specialty.length ||
  //       specialty.some((specialty) =>
  //         workout.specialty.includes(specialty)
  //       )) &&
  //     (duration.length === 0 || duration.indexOf(workout.duration) >= 0) &&
  //     (type.length === 0 || type.indexOf(workout.type) >= 0) &&
  //     (zwo.length === 0 || zwo.indexOf(workout.zwo) >= 0)
  //   );
  // });
  // }

  @Action(ResetLoading)
  resetLoading(ctx: StateContext<WorkoutStateModel>) {
    ctx.setState(
      patch<WorkoutStateModel>({
        loading: false,
      })
    );
  }
}
