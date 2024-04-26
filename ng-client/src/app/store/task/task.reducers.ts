import {TaskState} from "./task.model";
import {TaskActions, TaskActionsType} from "./task.actions";

const initialState: TaskState = {
  tasks: [],
  isLoading: false
}
export const taskReducer = (state = initialState, actions: TaskActionsType): TaskState => {
  switch (actions.type) {
    case TaskActions.GetTask:
      return {
        ...state,
        isLoading: true
      }
    case TaskActions.SetTask:
      return {
        tasks: actions.payload,
        isLoading: false
      }
    case TaskActions.ToggleLoading:
      return {
        ...state,
        isLoading: actions.payload
      }
    default:
      return state
  }
}
