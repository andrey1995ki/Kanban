import {WSAddTaskPayload, WSTaskResponse} from "../../websocket/websocket.model";

export interface TaskState {
    tasks: Array<TaskData>
    loading: boolean
    error: string
    messages: Array<TaskMessagesData>
}

export interface TaskData {
    board: string
    boardTasks: Array<WSTaskResponse>
}
export interface TaskMessagesData {
    id: string
    message: string
}

export interface SetTaskAction {
    boardId: string
    tasks: Array<WSTaskResponse>
}
export interface SetMessagesAction{
    messages: string
}
export interface DeleteMessagesAction{
    id: string
}

export interface editTaskData {
    taskData: Partial<WSAddTaskPayload>
    taskId: string
}
