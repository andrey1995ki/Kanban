import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TaskState} from "./task.model";

const getTaskStore = createFeatureSelector<TaskState>('task')

export const getTask = createSelector(getTaskStore, (state:TaskState)=> state.tasks)
export const getTaskById = createSelector(getTaskStore, (state: TaskState, columnId: string) =>{
  console.log(state.tasks, columnId)
  return state.tasks.filter((task) => task.board_column_id === columnId)
}
)
