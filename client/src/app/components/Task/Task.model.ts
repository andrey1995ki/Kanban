import {ApiTaskResponse, SubTaskData} from "../../store/api/api.model";
import React from "react";

export interface TaskWrapperProps {
    draggable: boolean
    id: string
}

export interface TaskProps extends ApiTaskResponse {
    draggable: boolean
}

export interface TaskComponentProps extends TaskProps {
    showModal: boolean
    toggleModal: () => void
    countSubTask: number
    countDoneSubTask: number
    onDragElement: (e: React.DragEvent<HTMLDivElement>) => void
}

export interface TaskDataProps extends ApiTaskResponse {
    editable: boolean
    showTask: boolean
    setShowTask: () => void
}

export interface ViewTaskProps extends ApiTaskResponse {
    setEdit: (edit: boolean) => void
    editable: boolean
}

export interface SubTaskProps extends SubTaskData {
    toggleSubTask: (id: string, done: boolean) => void
    editable: boolean
}
