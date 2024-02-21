import React, {ReactElement, RefObject} from "react";
import {ApiBoardColumnResponse} from "../../store/api/api.model";

export interface ColumnsProps {
    boardId: string
}

export interface ColumnsComponentProps extends ColumnsProps {
    boardData: Array<ApiBoardColumnResponse>
    showModal: boolean
    toggleModal: () => void
}

export type ColumnProps = Omit<ApiBoardColumnResponse, 'board_id'>

export interface ColumnComponentProps extends Omit<ColumnProps, 'id'> {
    dragOver: (event: React.DragEvent<HTMLDivElement>) => void
    dragEnd: (event: React.DragEvent<HTMLDivElement>) => void
    dropEvent: (event: React.DragEvent<HTMLDivElement>) => void
    columnRef: RefObject<HTMLElement>
    children: ReactElement
}
