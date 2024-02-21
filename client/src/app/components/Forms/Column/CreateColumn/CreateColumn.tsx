import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import style from "../../Forms.module.scss"
import {Button} from "../../../../../assets/common/components/Button";
import {Input} from "../../../../../assets/common/components/Fields";
import {FC, useEffect} from "react";
import {useAddBoardColumnMutation} from "../../../../store/api/api";
import {randomColor} from "./CreateColumn.utils";
import {maxLengthValid} from "../../Forms.validation";
import {CreateColumnProps} from "./CreateColumn.model";
import {ApiAddBoardColumnPayload} from "../../../../store/api/api.model";


export const CreateColumn: FC<CreateColumnProps> = ({boardId, setShowModal}) => {
    const {
        register, formState: {errors}, handleSubmit
    } = useForm()
    const [addColumn, {isLoading, isSuccess, isUninitialized}] = useAddBoardColumnMutation()
    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            setShowModal(false)
        }
    }, [isUninitialized, isSuccess, setShowModal])
    const errorMessage = errors?.title?.message as string | undefined
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const payload: ApiAddBoardColumnPayload = {
            title: data.title,
            color: data.color,
            final_stage: data.final_stage,
            board_id: boardId
        }
        await addColumn(payload)
    }

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('title', {
                required: 'Название обязательно', maxLength: {...maxLengthValid(30)}
            })} errors={errorMessage}
                   label={'Название колонки'}/>
            <div className={style.parameters}>
                <label className={style.field}>
                    <label className={style.color}>
                        <input type={'color'} {...register('color', {value: randomColor()})}/>
                        <span className={style.inputSpan}/>
                    </label>
                    <span>Цвет этапа</span>
                </label>
                <label className={style.field}>
                    <label className={style.checkbox}>
                        <input type={'checkbox'} {...register('final_stage')}/>
                        <span className={style.inputSpan}/>
                    </label>
                    <span>Финальный этап</span>
                </label>
            </div>
            <Button title={'Создать колонку'} type={'primary'} loading={isLoading} buttonType={'submit'}/>
        </form>
    );
};
