import {Action} from "@ngrx/store";
import {ChangeTaskData, CreateTaskData, Task} from "./task.model";

export enum TaskActions {
  GetTask = '[Task] GetTask',
  SetTask = '[Task] SetTask',
  ToggleLoading = '[Task] ToggleLoading',
  EditTask = '[Task] EditTask',
  CreateTask = '[Task] CreateTask',
  DeleteTask = '[Task] DeleteTask',
  SetMessages = '[Task] SetMessages'
}

export class GetTask implements Action {
  readonly type = TaskActions.GetTask
}

export class SetTask implements Action {
  readonly type = TaskActions.SetTask

  constructor(public payload: Task[]) {
  }
}

export class ToggleLoading implements Action {
  readonly type = TaskActions.ToggleLoading

  constructor(public payload: boolean) {
  }
}

export class EditTask implements Action {
  readonly type = TaskActions.EditTask

  constructor(public payload: { taskId: string, taskData: ChangeTaskData }) {
  }
}

export class CreateTask implements Action {
  readonly type = TaskActions.CreateTask

  constructor(public payload: CreateTaskData) {
  }
}

export class DeleteTask implements Action {
  readonly type = TaskActions.DeleteTask

  constructor(public payload: string) {
  }
}

export class SetMessages implements Action {
  readonly type = TaskActions.SetMessages

  constructor(public payload: string | undefined) {
  }
}

export type TaskActionsType = GetTask | SetTask | ToggleLoading | EditTask | CreateTask | DeleteTask | SetMessages
