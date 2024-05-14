import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TaskService} from "../../services/task/task.service";
import {TaskActions} from "./task.actions";
import {catchError, EMPTY, map, switchMap, tap} from "rxjs";
import {WSGetTaskMessages} from "../../services/task/task.model";

@Injectable()
export class TaskEffects {
  getTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(TaskActions.GetTask),
      switchMap(
        () =>
          this.taskWS.getTask().pipe(
            map((task) => {
              if ((task as WSGetTaskMessages)?.messages) {
                return ({type: TaskActions.SetMessages, payload: (task as WSGetTaskMessages).messages})
              }
              return ({type: TaskActions.SetTask, payload: task})
            }),
            catchError(() => {
              console.log('Ошибка получения задач')
              return EMPTY
            })
          )
      )
    )
  )
  editTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(TaskActions.EditTask),
      tap((value) => {
        this.taskWS.editTask(value['payload']['taskId'], value['payload']['taskData'])
      })
    ),
    {dispatch: false}
  )
  createTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(TaskActions.CreateTask),
      tap((value) => {
        this.taskWS.createTask(value['payload'])
      })
    ),
    {dispatch: false}
  )
  deleteTask$ = createEffect(
    () => this.actions$.pipe(
      ofType(TaskActions.DeleteTask),
      tap((value) => {
        this.taskWS.deleteTask(value['payload'])
      })
    ),
    {dispatch: false}
  )


  constructor(private actions$: Actions, private taskWS: TaskService) {
  }
}
