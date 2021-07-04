import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

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

export class Workouts {
  workouts: Workout[];
}

export interface WorkoutStateModel {}

@State<WorkoutStateModel>({
  name: 'workout',
  defaults: {},
})
export class WorkoutState {
  constructor() {}
}
