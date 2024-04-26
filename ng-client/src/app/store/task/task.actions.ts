import {Action} from "@ngrx/store";
import {Task} from "./task.model";

export enum TaskActions{
  GetTask ='[Task] GetTask',
  SetTask='[Task] SetTask',
  ToggleLoading='[Task] ToggleLoading',
}
export class GetTask implements Action{
  readonly type = TaskActions.GetTask
}
export class SetTask implements Action{
  readonly type = TaskActions.SetTask

  constructor(public payload: Task[]) {
  }
}
export class ToggleLoading implements Action{
  readonly type = TaskActions.ToggleLoading
  constructor(public payload: boolean) {
  }
}

export type TaskActionsType = GetTask | SetTask | ToggleLoading
