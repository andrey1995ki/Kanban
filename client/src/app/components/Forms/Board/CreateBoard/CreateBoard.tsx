import style from "../../Forms.module.scss";
import {Button} from "../../../../../assets/common/components/Button";
import {Input} from "../../../../../assets/common/components/Fields";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useAddBoardMutation} from "../../../../store/api/api";
import {FC, useEffect} from "react";
import {ApiBoardsResponse} from "../../../../store/api/api.model";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppSelector} from "../../../../store/app/app.selector";
import {addNewBoard} from "../../../../store/app/app.slice";
import {CreateBoardProps} from "./CreateBoard.model";
import {boardsExist, maxLengthValid} from "../../Forms.validation";

export const CreateBoard: FC<CreateBoardProps> = ({setShowModal}) => {
    const [addBoard, {isLoading, isSuccess, isUninitialized}] = useAddBoardMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {boards} = useSelector(AppSelector)
    const {
        register, handleSubmit, formState: {errors}, setError
    } = useForm()
    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            setShowModal(false)
        }
    }, [isUninitialized, isSuccess, setShowModal])
    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        if (!boardsExist(boards, formData.title)) {
            const {id, title}: ApiBoardsResponse = await addBoard({title: formData?.title.trim()}).unwrap()
            await dispatch(addNewBoard({id, title}))
            navigate(`/boards/${id}`)
        } else {
            setError("title", {
                type: "manual",
                message: "Доска с таким именем уже существует",
            })
        }
    }
    const errorMessage = errors?.title?.message as string | undefined
    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('title', {
                required: 'Название обязательно', maxLength: {...maxLengthValid(20)}
            })} errors={errorMessage}
                   label={'Название доски'}/>
            <Button title={'Создать доску'} type={'primary'} loading={isLoading} buttonType={"submit"}/>
        </form>
    );
};
