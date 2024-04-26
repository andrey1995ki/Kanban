import {Injectable} from '@angular/core';
import {catchError, distinctUntilChanged, EMPTY, Observable, tap} from "rxjs";
import {webSocket} from "rxjs/webSocket";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/store";
import {GetToken} from "../../store/auth";
import {WSGetTaskResponse} from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private webSocket$: any
  private token: string | undefined

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
      deserializer: ({data}) => JSON.parse(data).data
    })
    this.webSocket$.subscribe()
  }

  close() {
    if (this.webSocket$) {
      this.webSocket$.unsubscribe()
    }
  }

  getTask(): Observable<WSGetTaskResponse[]> {
    this.webSocket$.next({type: 'read', token: this.token})
    return this.webSocket$.pipe(
      distinctUntilChanged(),
      tap(r => console.log(r)),
      catchError(_ => EMPTY)
    )
  }
}
