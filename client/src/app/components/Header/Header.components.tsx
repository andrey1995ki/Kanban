import style from "./Header.module.scss";
import {HiViewBoards} from "react-icons/hi";
import {Button} from "../../../assets/common/components/Button";
import {FaPlus} from "react-icons/fa6";
import {FC} from "react";
import {HeaderComponentProps} from "./Header.model";
import {AuthBlock} from "./components/AuthBlock";

export const HeaderComponents: FC<HeaderComponentProps> = ({
                                                               title,
                                                               showBtn,
                                                               navigate,
                                                               toggleModal,
                                                               isAuth,
                                                               children
                                                           }) => {
    return (
        <div className={style.header}>
            <div className={style.title}>
                <div className={style.icon}>
                    <HiViewBoards onClick={() => navigate('/')}/>
                </div>
                <h2 className={style.siderName}>kanban</h2>
            </div>
            <div className={style.headerData}>
                <div className={style.headerTitle}>
                    <h2>{title ? title : ''}</h2>
                </div>
                <div className={style.headerAction}>
                    {
                        isAuth ?
                            <>
                                <div>
                                    {
                                        showBtn && <Button title={'Добавить задачу'} type={'primary'} icon={<FaPlus/>}
                                                           onClick={() => toggleModal()}/>
                                    }
                                </div>
                                {children}
                            </>
                            : <AuthBlock/>
                    }

                </div>
            </div>
        </div>
    );
}
