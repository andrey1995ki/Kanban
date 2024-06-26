import {FC, memo, useState} from "react";
import {useChangeBoardNameMutation, useDeleteBoardMutation} from "../../../../store/api/api";
import {useSelector} from "react-redux";
import {AppSelector} from "../../../../store/app/app.selector";
import {EditBoardPayload, EditBoardProps} from "./EditBoard.model";
import {boardsExist} from "../../Forms.validation";
import {ModalOptions} from "../../../../../assets/common/components/ModalOptions";
import {ModalOptionsForm} from "../../../../../assets/common/components/ModalOptionsForm";

export const EditBoard: FC<EditBoardProps> = memo(({title, id, setError}) => {
    const [onEdit, setOnEdit] = useState(false)
    const {boards} = useSelector(AppSelector)
    const [changeBoardName, {isLoading}] = useChangeBoardNameMutation()
    const [deleteBoard] = useDeleteBoardMutation()
    /**
     * Функция переключения режима редактирования
     * @param edit признак редактирования
     */
    const toggleEdit = (edit: boolean) => {
        setOnEdit(edit)
    }
    /**
     * Функция для подтверждения удаления доски
     */
    const confirmDeleteBoard = async () => {
        const deleted = confirm(`Удалить доску: ${title} и все задачи в ней?`);
        if (deleted) {
            await deleteBoard(id)
        }
    }
    /**
     * Проверка наличия ошибки
     * @param param параметр проверки
     */
    const checkError = (param: string) => {
        return boardsExist(boards, param)
    }
    /**
     * Функция изменения данных доски
     * @param payload
     */
    const onSubmit = async (payload: EditBoardPayload) => {
        payload.title !== title && await changeBoardName({boardID: id, title: payload.title}).unwrap()
        setOnEdit(false)
    }
    return (
        <>
            {
                onEdit
                    ?
                    <ModalOptionsForm<EditBoardPayload> initialValue={title} paramName={'title'}
                                                        isLoading={isLoading}
                                                        toggleEdit={toggleEdit} setFormError={setError}
                                                        checkError={(param) => checkError(param)}
                                                        submit={onSubmit}/>
                    :
                    <ModalOptions title={title} confirmDeleteBoard={confirmDeleteBoard} toggleEdit={toggleEdit}/>
            }

        </>
    );
})
