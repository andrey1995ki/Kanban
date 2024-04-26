import {WSGetTaskResponse} from "../../services/task/task.model";

export type Task = WSGetTaskResponse
export interface TaskState{
  tasks: Task[],
  isLoading: boolean
}
