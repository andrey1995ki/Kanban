import {WSAddTaskPayload, WSEditTaskPayload, WSGetTaskResponse} from "../../services/task/task.model";

export type Task = WSGetTaskResponse

export type ChangeTaskData = WSEditTaskPayload

export type CreateTaskData = WSAddTaskPayload

export interface TaskState {
  tasks: Task[],
  isLoading: boolean,
  messages: string | undefined
}
