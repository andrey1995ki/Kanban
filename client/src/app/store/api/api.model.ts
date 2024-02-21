export interface ApiBoardsResponse {
    id: string
    title: string
}

export type ApiAddBoardPayload = Omit<ApiBoardsResponse, 'id'>

export interface ApiBoardColumnResponse {
    id: string
    board_id: string
    title: string
    color: string
    final_stage: boolean
}

export type ApiAddBoardColumnPayload = Omit<ApiBoardColumnResponse, 'id'>

export interface ApiTaskResponse {
    id: string
    board_column_id: string
    title: string
    description: string
    sub_task: Array<SubTaskData>
}

export type ApiAddTaskPayload = Omit<ApiTaskResponse, 'id'>

export interface ApiToggleTaskPayload {
    body: Array<SubTaskData>
    taskId: string
}

export interface SubTaskData {
    id: string
    title: string
    final: boolean
}

