export interface WSGetTaskResponse {
  id: string
  board_column_id: string
  board_id: string
  title: string
  description: string
  sub_task: SubTaskData[]
}
export interface WSGetTaskMessages{
  messages: string
}

export interface SubTaskData {
  id: string
  title: string
  final: boolean
  task_id: string
}

export type WSAddTaskPayload = Omit<WSGetTaskResponse, 'id'>

export type WSEditTaskPayload = Partial<WSAddTaskPayload>
