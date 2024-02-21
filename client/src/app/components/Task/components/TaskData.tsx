import {FC, useState} from "react";
import {TaskDataProps} from "../Task.model";
import {Modal} from "../../../../assets/common/components/Modal";
import {ViewTask} from "./ViewTask";
import {AddTask} from "../../Forms/Task/AddTask";

export const TaskData: FC<TaskDataProps> = (props) => {
    const {
        title, showTask, description, sub_task,
        setShowTask, editable, board_column_id, id
    } = props

    const [editTask, setEdit] = useState(false)
    const toggleModal = () => {
        setEdit(false)
        setShowTask()
    }
    return (
        <Modal showModal={showTask} setShowModal={toggleModal}
               title={editTask ? `Редактирование задачи ${title}` : undefined}>
            {
                editTask && editable
                    ? <AddTask setShowModal={toggleModal} title={title} sub_task={sub_task} id={id}
                               board_column_id={board_column_id} description={description} editable={editable}
                               setEdit={setEdit}/>
                    : <ViewTask setEdit={setEdit} id={id} board_column_id={board_column_id} title={title}
                                description={description} sub_task={sub_task} editable={editable}/>
            }
        </Modal>
    );
};
