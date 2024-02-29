import React, {FC, useRef} from 'react';
import {ColumnProps} from "../Columns.model";
import style from "../Columns.module.scss";
import {ColumnComponent} from "./Column.component";
import {TaskWrapper} from "../../Task/Task.wrapper";
// import {useDispatch} from "react-redux";
// import {AppDispatch} from "../../../store/store";
// import {editTask} from "../../../store/task/task.slice";
import {useChangeBoardColumnMutation} from "../../../store/api/api";


export const Column: FC<ColumnProps> = ({color, final_stage, id, title}) => {
    const [changeBoard] = useChangeBoardColumnMutation()
    // const dispatch = useDispatch<AppDispatch>()
    const ref = useRef<HTMLElement>(null)
    /**
     * Функция для изменения колонки у задачи
     * @param taskId id задачи
     */
    const changeColumn = async (taskId: string) => {
        await changeBoard({taskId: taskId, board_column_id: id}).unwrap()
        // dispatch(editTask({taskData: {board_column_id: id}, taskId: taskId}))
    }
    /**
     * Функция отслеживющая перемещения задачи над оболстю
     * и добавляющее необходимый стиль
     * @param event
     */
    const dragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const effectAllowed = event.dataTransfer?.effectAllowed
        if (effectAllowed === 'move') {
            ref.current?.classList.add(style.dragging);
        }
    }
    /**
     * Функция отслеживающая покидания задачи с области
     * и удаление ранее добавленого стиля
     * @param event
     */
    const dragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        ref.current?.classList.remove(style.dragging);
    }
    /**
     * Фунция отслеживающея перетаскивание задачи на колонку
     * удаляющая стиль и вызывающий функцию для сохранения изменений
     * @param event
     */
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
