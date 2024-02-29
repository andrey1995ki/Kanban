import {FC} from "react";
import {ViewTaskProps} from "../Task.model";
import {Options} from "../../../../assets/common/components/Options";
import style from '../Task.module.scss'
import {SubTask} from "./SubTask";
import {useSelector} from "react-redux";
import {AppSelector} from "../../../store/app/app.selector";
import {Select} from "../../../../assets/common/components/Fields";
import {OptionsArray} from "../../../../assets/common/components/Options/Options.model";
// import {AppDispatch} from "../../../store/store";
// import {deleteTask, editTask} from "../../../store/task/task.slice";
import {useChangeBoardColumnMutation, useDeleteTaskMutation, useToggleSubTaskMutation} from "../../../store/api/api";

export const ViewTask: FC<ViewTaskProps> = ({
                                                title,
                                                description,
                                                sub_task,
                                                setEdit,
                                                id: taskId,
                                                board_column_id,
                                                editable
                                            }) => {
    const {columns} = useSelector(AppSelector)
    // const dispatch = useDispatch<AppDispatch>()
    const options = columns.map(column => <option value={column.id} key={column.id}>{column.title}</option>)
    const haveSubTask = sub_task.length > 0
    const countFinishedSubTask = sub_task?.filter(task => task.final).length
    const [toggleSubTask] = useToggleSubTaskMutation()
    const [changeColumn] = useChangeBoardColumnMutation()
    const [deleteTask] = useDeleteTaskMutation()
    /**
     * Функция для выполнения подзадач
     * @param id подзадачи
     * @param done статус подзадачи
     */
    const changeSubTask = (id: string, done: boolean) => {
        sub_task = sub_task.map(task => {
            if (task.id === id) {
                return {...task, final: done}
            }
            return task
        })
        toggleSubTask({body: sub_task, taskId})
        // dispatch(editTask({taskData: {sub_task: sub_task}, taskId: taskId}))
    }
    /**
     * Изменение статуса (колонки) к которому относится задача
     * @param e
     */
    const changeStatus = (e: { target: any }) => {
        changeColumn({taskId, board_column_id: e.target.value})
        // dispatch(editTask({taskData: {board_column_id: e.target.value}, taskId: taskId}))
    }
    /**
     * Функция удаления задачи
     * @param id задачи
     */
    const taskDelete = async (id: string) => {
        const submitDelete = confirm(`Удалить задачу ${title} без возможности восстановления?`)
        submitDelete && await deleteTask(id) //dispatch(deleteTask(id))
    }
    let optionsArray: Array<OptionsArray> = [{
        callback: () => taskDelete(taskId),
        title: 'Удалить задачу'
    }]
    if (editable) {
        optionsArray = [{
            callback: () => setEdit(true),
            title: 'Редактировать'
        }, ...optionsArray]
    }
    return (
        <div className={style.taskData}>
            <div className={style.title}><h3>{title}</h3><Options optionsArray={optionsArray}/></div>
            <div className={style.description}><span>{description}</span></div>
            {
                haveSubTask &&
                <div className={style.subTaskBlock}>
                    <div className={style.subTitle}>
                        <span>Подзадачи ({countFinishedSubTask} из {sub_task.length})</span>
                    </div>
                    <div className={style.subTask}>
                        {
                            sub_task.map(task => <SubTask title={task.title} final={task.final} key={task.id}
                                                          id={task.id} toggleSubTask={changeSubTask}
                                                          editable={editable}/>)
                        }
                    </div>
                </div>
            }
            <form>
                <Select options={options} onChange={async (e) => changeStatus(e)} onBlur={async () => {
                }} name={'board_column_id'} value={board_column_id}
                />
            </form>
        </div>
    )
}
