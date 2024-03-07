import React, {FC} from 'react';
import {SiderComponent} from "./Sider.component";
import {SiderProps} from "./Sider.model";
import {useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";
import {useParams} from "react-router-dom";
import {useModal} from "../../../assets/common/hook/useModal";
import {Modal} from "../../../assets/common/components/Modal";
import {CreateBoard} from "../Forms/Board/CreateBoard/CreateBoard";
import {UserSelector} from "../../store/user/user.selector";

export const Sider: FC<SiderProps> = ({setDisplaySider, scheme, setIsDarkTheme, isDarkTheme}) => {
    const {boards} = useSelector(AppSelector)
    const {isAuth} = useSelector(UserSelector)
    const {showModal, toggleModal} = useModal()
    const {boardId} = useParams();
    /**
     * Функция для переключения класса отвечающего за тему
     */
    const toggleTheme = () => {
        document.body.classList.toggle(scheme);
    }
    /**
     * Изменение темы через переключатель
     * @param e
     */
    const changeTheme = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const checkedDark = e.target.checked
        setIsDarkTheme(checkedDark)
        toggleTheme()
    }
    return (
        <>
            <SiderComponent changeTheme={changeTheme} isDarkTheme={isDarkTheme} boards={boards} activeBoards={boardId}
                            setShowModal={toggleModal} setDisplaySider={setDisplaySider} isAuth={isAuth}/>
            <Modal showModal={showModal} setShowModal={toggleModal} title={'Добавить доску'}>
                <CreateBoard setShowModal={toggleModal}/>
            </Modal>
        </>
    )

}
