import React, {FC, useRef} from 'react';
import {ColumnProps} from "../Columns.model";
import style from "../Columns.module.scss";
import {useChangeBoardColumnMutation} from "../../../store/api/api";
import {ColumnComponent} from "./Column.component";
import {TaskWrapper} from "../../Task/Task.wrapper";


export const Column: FC<ColumnProps> = ({color, final_stage, id, title}) => {
    const [changeBoard] = useChangeBoardColumnMutation()
    const ref = useRef<HTMLElement>(null)
    const changeColumn = async (taskId: string) => {
        await changeBoard({taskId: taskId, board_column_id: id}).unwrap()
    }
    const dragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const effectAllowed = event.dataTransfer?.effectAllowed
        if (effectAllowed === 'move') {
            ref.current?.classList.add(style.dragging);
        }
    }
    const dragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        ref.current?.classList.remove(style.dragging);
    }
    const dropEvent = async (event: React.DragEvent<HTMLDivElement>): Promise<void> => {
        event.preventDefault();
        const effectAllowed = event.dataTransfer?.effectAllowed
        ref.current?.classList.remove(style.dragging);
        if (effectAllowed === 'move') {
            const data = event.dataTransfer?.getData('text');
            const dropData = data ? JSON.parse(data) : {}
            if (dropData.column !== id) {
                await changeColumn(dropData.task)
            }
        }
    }
    return (
        <ColumnComponent dragOver={dragOver} dragEnd={dragEnd} dropEvent={dropEvent} color={color}
                         final_stage={final_stage} title={title} columnRef={ref}>
            <TaskWrapper draggable={!final_stage} id={id}/>
        </ColumnComponent>

    )


}
