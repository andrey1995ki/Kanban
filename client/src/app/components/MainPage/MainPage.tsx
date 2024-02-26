import {FC} from 'react';
import style from './MainPage.module.scss'
import {HiViewBoards} from "react-icons/hi";
import {GrGraphQl} from "react-icons/gr";
import {useNavigate} from "react-router-dom";

export const MainPage: FC = () => {
    const navigate = useNavigate()
    return (
        <div className={style.mainPage} >
            <div className={style.mainBlock} >
                <div className={style.title}>
                    <div className={style.icon}>
                        <HiViewBoards/>
                    </div>
                    <h2>kanban</h2>
                </div>
                <div className={style.data}>
                    <h1 className={style.mainText}>Выберете доску чтобы продолжить</h1>
                    <div className={style.toGraphQl}>
                        <div className={style.graphQl}>
                            <GrGraphQl onClick={() => navigate('/graphql')}/>
                        </div>
                        <h3>Открыть доски с GraphQl</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
