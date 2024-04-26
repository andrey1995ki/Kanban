import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TaskService} from "../../services/task/task.service";
import {TaskActions} from "./task.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";

@Injectable()
export class TaskEffects {
  getTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(TaskActions.GetTask),
      exhaustMap(
        () =>
          this.taskWS.getTask().pipe(
            map((task) => ({type: TaskActions.SetTask, payload: task})),
            catchError(() => EMPTY)
          )
      )
    )
  )

  constructor(private actions$: Actions, private taskWS: TaskService) {
  }
}
