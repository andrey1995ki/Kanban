import {Input, Select, TextArea} from "../../../../assets/common/components/Fields";
import {FieldValues, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {maxLengthValid} from "../Forms.validation";
import {Button} from "../../../../assets/common/components/Button";
import style from "../Forms.module.scss";
import {FaPlus, FaTimes} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {AppSelector} from "../../../store/app/app.selector";
import {useAddTaskMutation, useChangeTaskMutation} from "../../../store/api/api";
import {AddTaskModel} from "./AddTask.model";
import {FC, useEffect} from "react";
import {AppDispatch} from "../../../store/store";
import {useParams} from "react-router-dom";
// import {ApiAddTaskPayload} from "../../../store/api/api.model";
import {addTask, editTask} from "../../../store/task/task.slice";
import {WSAddTaskPayload} from "../../../websocket/websocket.model";

export const AddTask: FC<AddTaskModel> = (props) => {
    const dispatch = useDispatch<AppDispatch>()
    const {boardId} = useParams()
    const {
        title, description, sub_task,
        editable, board_column_id, id: taskId, setShowModal, setEdit
    } = props
    const {columns} = useSelector(AppSelector)
    const [/*addTaskAPi*/, {
        isLoading: addTaskLoading,
        isSuccess: addTaskSuccess,
        isUninitialized: addTaskUninitialized
    }] = useAddTaskMutation()
    const [/*changeTask*/, {
        isLoading: changeTaskLoading,
        isSuccess: changeTaskSuccess,
        isUninitialized: changeTaskUninitialized
    }] = useChangeTaskMutation()
    const {
        register, control, handleSubmit, formState: {errors}
    } = useForm({
        defaultValues: {
            title: title,
            description: description,
            board_column_id: board_column_id,
            sub_task: sub_task
        }
    })
    const {fields, append, remove} = useFieldArray({
        control,
        name: "sub_task"
    });
    useEffect(() => {
        if (!addTaskUninitialized && addTaskSuccess) {
            setShowModal(false)
        }
    }, [addTaskUninitialized, addTaskSuccess, setShowModal])
    useEffect(() => {
        if (!changeTaskUninitialized && changeTaskSuccess) {
            setEdit && setEdit(false)
        }
    }, [changeTaskUninitialized, changeTaskSuccess, setEdit])
    /**
     * Функция для создания\изменения задачи
     * @param formData
     */
    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        if (editable) {
            await dispatch(editTask({taskData: {...formData as WSAddTaskPayload, board_id: boardId!}, taskId: taskId!}))
            // await changeTask({...formData as ApiAddTaskPayload, taskId: taskId as string})
        } else {
            await dispatch(addTask({...formData as WSAddTaskPayload, board_id: boardId!}))
            // await addTaskAPi(formData as ApiAddTaskPayload)
        }
        setShowModal(false)
    }
    const options = columns.map(column => <option value={column.id} key={column.id}>{column.title}</option>)
    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('title', {
                required: 'Название обязательно', maxLength: {...maxLengthValid(50)}
            })} label={'Название'} errors={errors.title?.message as string | undefined}/>
            <TextArea {...register('description', {
                required: 'Описание обязательно', maxLength: {...maxLengthValid(150)}
            })} label={'Описание'} errors={errors.description?.message as string | undefined}/>
            <div>
                {fields.map((item, index) => (
                    <div key={item.id} className={style.formArray}>
                        <Input {...register(`sub_task.${index}.title`, {
                            required: 'Описание обязательно',
                            maxLength: {...maxLengthValid(30)}
                        })} disabled={item['final']}/>
                        {
                            !item['final'] &&
                            <button type="button" onClick={() => remove(index)}><FaTimes/></button>
                        }
                    </div>
                ))}
            </div>
            <Button title={'Добавить подзадачу'} onClick={() => append({id: '', title: '', final: false})}
                    icon={<FaPlus/>}/>
            <Select {...register('board_column_id')} options={options}/>
            <Button title={editable ? 'Сохранить изменения' : `Создать задачу`} buttonType={'submit'} type={'primary'}
                    loading={addTaskLoading || changeTaskLoading}/>
        </form>
    );
};
