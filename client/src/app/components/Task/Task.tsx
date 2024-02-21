import React, {FC, memo} from 'react';
import {TaskProps} from "./Task.model";
import {useModal} from "../../../assets/common/hook/useModal";
import {TaskComponent} from "./Task.component";

export const Task: FC<TaskProps> = memo((props) => {
    const {title, sub_task, id, board_column_id, draggable, description} = props
    const {showModal, toggleModal} = useModal()
    const countSubTask = sub_task.length
    const countDoneSubTask = sub_task.filter((task) => task.final).length
    const onDragElement = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.dataTransfer?.effectAllowed) {
            e.dataTransfer.effectAllowed = draggable ? 'move' : 'all';
        }
        e.dataTransfer?.setData('text', JSON.stringify({task: id, column: board_column_id}));
    }
    return <TaskComponent showModal={showModal} toggleModal={toggleModal} countSubTask={countSubTask}
                          countDoneSubTask={countDoneSubTask} onDragElement={onDragElement} draggable={draggable}
                          id={id} board_column_id={board_column_id} title={title} description={description}
                          sub_task={sub_task}/>
})
