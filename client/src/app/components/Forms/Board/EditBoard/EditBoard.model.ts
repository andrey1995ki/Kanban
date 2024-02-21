import {ApiBoardsResponse} from "../../../../store/api/api.model";

export interface EditBoardProps extends ApiBoardsResponse {
    setError: (error: string | undefined) => void
}
export interface EditBoardPayload {
    title: string
}
