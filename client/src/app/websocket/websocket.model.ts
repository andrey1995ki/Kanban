import {ApiTaskResponse} from "../store/api/api.model";

export interface WSTaskResponse extends ApiTaskResponse {
    board_id: string
}

export type WSAddTaskPayload = Omit<WSTaskResponse, 'id'>
