import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TaskState} from "./task.model";

const getTaskStore = createFeatureSelector<TaskState>('task')

export const getTask = createSelector(getTaskStore, (state:TaskState)=> state.tasks)
export const getTaskByColumn = createSelector(getTaskStore, (state: TaskState, columnId: string) =>state.tasks.filter((task) => task.board_column_id === columnId))
export const getTaskById = createSelector(getTaskStore, (state: TaskState, id: string) =>state.tasks.filter((task) => task.id === id)?.[0])
export const getMessages = createSelector(getTaskStore, (state: TaskState)=> state.messages)
