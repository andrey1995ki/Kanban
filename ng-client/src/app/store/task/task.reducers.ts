import {TaskState} from "./task.model";
import {TaskActions, TaskActionsType} from "./task.actions";

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  messages: undefined
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
        ...state,
        tasks: actions.payload,
        isLoading: false
      }
    case TaskActions.ToggleLoading:
      return {
        ...state,
        isLoading: actions.payload
      }
    case TaskActions.EditTask:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== actions.payload.taskId)
      }
    case TaskActions.SetMessages:
      return {
        ...state,
        messages: actions.payload
      }
    default:
      return state
  }
}
