import style from "./Columns.module.scss";
import {Column} from "./components/Column";
import {FaPlus} from "react-icons/fa6";
import {Modal} from "../../../assets/common/components/Modal";
import {CreateColumn} from "../Forms/Column/CreateColumn/CreateColumn";
import {FC} from "react";
import {ColumnsComponentProps} from "./Columns.model";

export const ColumnsComponent: FC<ColumnsComponentProps> = ({boardId, boardData, showModal, toggleModal}) => {
    return (
        <div className={style.boards}>
            {
                boardData?.map((column) => {
                    return <Column key={column.id} color={column.color}
                                   final_stage={column.final_stage} id={column.id} title={column.title}/>
                })
            }
            <div className={style.createNew} onClick={() => toggleModal()}>
                <div className={style.text}>
                    <div className={style.textIcon}>
                        <FaPlus/>
                    </div>
                    <h2>Добавить колонку</h2>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={toggleModal}
                   title={'Создание новой колонки'}><CreateColumn boardId={boardId} setShowModal={toggleModal}/></Modal>
        </div>
    );
};
