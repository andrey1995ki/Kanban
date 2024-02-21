import {FC} from 'react';
import style from "./Task.module.scss";
import {TaskData} from "./components/TaskData";
import {TaskComponentProps} from "./Task.model";

export const TaskComponent: FC<TaskComponentProps> = (props) => {
    const {
        draggable,
        onDragElement,
        toggleModal,
        title,
        countSubTask,
        countDoneSubTask,
        sub_task,
        id,
        board_column_id,
        description,
        showModal
    } = props
    return (
        <>
            <div className={style.task} draggable={draggable} onDragStart={onDragElement}
                 onClick={() => toggleModal()}>
                <div><h3>{title}</h3></div>
                {
                    countSubTask > 0 &&
                    <span className={style.subTaskTitle}>{countDoneSubTask} из {countSubTask} подзадач</span>
                }
            </div>
            <TaskData title={title} sub_task={sub_task} id={id} board_column_id={board_column_id}
                      description={description} showTask={showModal}
                      setShowTask={toggleModal} editable={draggable}/>
        </>
    );
}
