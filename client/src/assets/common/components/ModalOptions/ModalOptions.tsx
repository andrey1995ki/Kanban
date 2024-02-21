import {FC, memo} from 'react';
import style from '../../../../app/components/Forms/Forms.module.scss'
import {ModalOptionsProps} from "./ModalOptions.model";
import {FaPencilAlt, FaRegTrashAlt} from "react-icons/fa";

export const ModalOptions:FC<ModalOptionsProps> =memo(({title,toggleEdit,confirmDeleteBoard }) => {
    return (
        <>
            <div className={style.editBoard}>
                <div className={style.editBoardText}>{title}</div>
                <button className={`${style.editBoardBtn} ${style.edit}`} onClick={() => toggleEdit(true)}>
                    <FaPencilAlt/>
                </button>
                <button className={`${style.editBoardBtn} ${style.delete}`}
                        onClick={() => confirmDeleteBoard()}>
                    <FaRegTrashAlt/>
                </button>
            </div>
        </>
    );
})
