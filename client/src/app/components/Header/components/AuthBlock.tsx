import {Button} from "../../../../assets/common/components/Button";
import style from "../Header.module.scss";
import {Modal} from "../../../../assets/common/components/Modal";
import {useModal} from "../../../../assets/common/hook/useModal";
import {LoginForm} from "../../Forms/Auth/LoginForm";
import {RegistryForm} from "../../Forms/Auth/RegistryForm";

export const AuthBlock = () => {
    const {showModal: showLogin, toggleModal: toggleLogin} = useModal()
    const {showModal: showRegistry, toggleModal: toggleRegistry} = useModal()
    return (
        <div className={style.authBlock}>
            <Button title={'Вход'} type={'primary'} onClick={toggleLogin}/>
            <Button title={'Регистрация'} onClick={toggleRegistry}/>
            <Modal showModal={showLogin} setShowModal={toggleLogin}>
                <LoginForm toggleModal={toggleLogin}/>
            </Modal>
            <Modal showModal={showRegistry} setShowModal={toggleRegistry}>
                <RegistryForm toggleModal={toggleRegistry}/>
            </Modal>
        </div>
    );
};
