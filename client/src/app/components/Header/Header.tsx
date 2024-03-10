import {FC} from 'react';
import {useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";
import {useNavigate, useParams} from "react-router-dom";
import {useModal} from "../../../assets/common/hook/useModal";
import {HeaderComponents} from "./Header.components";
import {AddTask} from "../Forms/Task/AddTask";
import {Modal} from "../../../assets/common/components/Modal";
import {HeaderOptions} from "./components/HeaderOptions";
import {UserSelector} from "../../store/user/user.selector";


export const Header: FC = () => {
    const {boardId} = useParams();
    const {boards, columns} = useSelector(AppSelector)
    const {isAuth} = useSelector(UserSelector)
    const title = boards?.find((board) => board.id === boardId)?.title || ''
    const showBtn = columns.length > 0 && boardId
    const {showModal, toggleModal} = useModal()
    const navigate = useNavigate();
    return (
        <>
            <HeaderComponents title={title} showBtn={!!showBtn} toggleModal={toggleModal} navigate={navigate}
                              isAuth={isAuth}>
                <HeaderOptions showBtn={!!showBtn} boardId={boardId}/>
            </HeaderComponents>
            <Modal showModal={showModal} setShowModal={toggleModal} title={'Добавить задачу'}><AddTask
                setShowModal={toggleModal}/></Modal>
        </>
    )

}
