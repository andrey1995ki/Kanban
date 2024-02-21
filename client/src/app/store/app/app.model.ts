import {ApiBoardColumnResponse, ApiBoardsResponse} from "../api/api.model";

export interface AppState {
    boards: Array<ApiBoardsResponse>
    columns: Array<ApiBoardColumnResponse>
}
