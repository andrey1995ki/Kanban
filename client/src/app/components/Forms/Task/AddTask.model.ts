import {ApiTaskResponse} from "../../../store/api/api.model";

export interface AddTaskModel extends Partial<ApiTaskResponse> {
    setShowModal: (showModal: boolean) => void
    editable?: boolean
    setEdit?: (edit: boolean) => void
}
