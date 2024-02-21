import {FC} from 'react';
import style from './MainPage.module.scss'
import {HiViewBoards} from "react-icons/hi";

export const MainPage: FC = () => {
    return (
        <div className={style.mainPage} >
            <div className={style.mainBlock} >
                <div className={style.title}>
                    <div className={style.icon}>
                        <HiViewBoards/>
                    </div>
                    <h2>kanban</h2>
                </div>
                <h1 className={style.mainText}>Выберете доску чтобы продолжить</h1>
            </div>
        </div>
    );
}
