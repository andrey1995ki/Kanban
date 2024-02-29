import {FC, useState} from 'react';
import {EditColumnPayload, EditColumnProps, ElementChildren} from "./EditColumn.model";
import {ModalOptions} from "../../../../../assets/common/components/ModalOptions";
import {ModalOptionsForm} from "../../../../../assets/common/components/ModalOptionsForm";
import {ApiBoardColumnResponse} from "../../../../store/api/api.model";
import {useDeleteBoardColumnMutation, useEditBoardColumnMutation} from "../../../../store/api/api";

export const EditColumn: FC<EditColumnProps> = ({title, setError, final_stage, color, id, board_id}) => {
    const [onEdit, setOnEdit] = useState(false)
    const [changeBoardName, {isLoading}] = useEditBoardColumnMutation()
    const [deleteBoard] = useDeleteBoardColumnMutation()
    /**
     * Функция переключения режима редактирования
     * @param edit признак редактирования
     */
    const toggleEdit = async (edit: boolean) => {
        await setOnEdit(edit)
    }
    /**
     * Функция для подтверждения удаления колонки
     */
    const confirmDeleteBoard = () => {
        const deleted = confirm(`Удалить колонку: ${title} и все задачи в ней?`);
        if (deleted) {
            deleteBoard(id)
        }
    }
    /**
     * Функция изменения данных колонки
     * @param data
     */
    const submit = async (data: EditColumnPayload) => {
        await changeBoardName({id: id, body: {...data, board_id: board_id}})
        setOnEdit(false)
    }
    // Массив для создания элементов в режиме редактирования
    const element: Array<ElementChildren<ApiBoardColumnResponse>> = [{
        type: 'color',
        label: 'Цвет этапа',
        name: 'color',
        initValue: color
    }, {
        type: 'checkbox',
        label: 'Финальный этап',
        name: 'final_stage',
        initValue: final_stage
    },
    ]
    return (
        <>
            {
                onEdit
                    ?
                    <ModalOptionsForm<EditColumnPayload, ApiBoardColumnResponse> initialValue={title}
                                                                                 paramName={'title'}
                                                                                 isLoading={isLoading}
                                                                                 toggleEdit={toggleEdit}
                                                                                 setFormError={setError} submit={submit}
                                                                                 childrenElements={element}/>
                    :
                    <ModalOptions title={title} confirmDeleteBoard={confirmDeleteBoard} toggleEdit={toggleEdit}/>
            }

        </>
    );
};
