import {WSAddTaskPayload, WSTaskResponse} from "../../websocket/websocket.model";

export interface TaskState {
    tasks: Array<TaskData>
    loading: boolean
    error: string
}

export interface TaskData {
    board: string
    boardTasks: Array<WSTaskResponse>
}

export interface SetTaskAction {
    boardId: string
    tasks: Array<WSTaskResponse>
}

export interface editTaskData {
    taskData: Partial<WSAddTaskPayload>
    taskId: string
}
