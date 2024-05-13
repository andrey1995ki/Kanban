import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, distinctUntilChanged, EMPTY, Observable} from "rxjs";
import {webSocket} from "rxjs/webSocket";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {GetToken} from "../../store/auth";
import {WSAddTaskPayload, WSEditTaskPayload, WSGetTaskMessages, WSGetTaskResponse} from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private webSocket$: any
  private token: string | undefined

  public selectedTask$ = new BehaviorSubject<undefined | string>(undefined)

  constructor(private store: Store<AppState>) {
    store.select(GetToken).subscribe(t => this.token = t)
  }

  public connect() {
    this.create()
  }

  private create() {
    if (this.webSocket$) {
      this.webSocket$.unsubscribe()
    }
    this.webSocket$ = webSocket({
      url: 'ws://localhost:3001/kanban/socket',
      openObserver: {
        next: () => {
          this.webSocket$.next({type: 'connect'})
        }
      },
      deserializer: ({data}) => {
        const dataRes: Array<any> | undefined = JSON.parse(data).data
        return dataRes || JSON.parse(data)
      }
    })
    this.webSocket$.subscribe()
  }

  close() {
    if (this.webSocket$) {
      this.webSocket$.unsubscribe()
    }
  }

  getTask(): Observable<WSGetTaskResponse[] | WSGetTaskMessages> {
    this.webSocket$.next({type: 'read', token: this.token})
    return this.webSocket$.pipe(
      distinctUntilChanged(),
      catchError(_ => EMPTY)
    )
  }

  editTask(taskId: string, taskData: WSEditTaskPayload) {
    this.webSocket$.next({
      type: 'update',
      id: taskId,
      data: taskData,
      token: this.token
    })
  }

  createTask(taskData: WSAddTaskPayload) {
    this.webSocket$.next({
      type: 'create',
      path: 'task',
      data: taskData,
      token: this.token
    })
  }

  deleteTask(taskId: string) {
    this.webSocket$.next({
      type: 'delete',
      id: taskId,
      token: this.token
    })
  }
}
