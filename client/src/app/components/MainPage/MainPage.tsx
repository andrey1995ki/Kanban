import {FC} from 'react';
import style from './MainPage.module.scss'
import {HiViewBoards} from "react-icons/hi";
import {GrGraphQl} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import {SiStorybook} from "react-icons/si";

export const MainPage: FC = () => {
    const sbUrls = import.meta.env.VITE_STORYBOOK_URL || ''
    const navigate = useNavigate()
    return (
        <div className={style.mainPage}>
            <div className={style.mainBlock}>
                <div className={style.title}>
                    <div className={style.icon}>
                        <HiViewBoards/>
                    </div>
                    <h2>kanban</h2>
                </div>
                <div className={style.data}>
                    <h1 className={style.mainText}>Выберете доску чтобы продолжить</h1>
                    <div className={style.modules}>
                        <div className={style.toModule}>
                            <div className={style.module}>
                                <GrGraphQl onClick={() => navigate('/graphql')}/>
                            </div>
                            <h3>Открыть доски с GraphQl</h3>
                        </div>
                        <div className={style.toModule}>
                            <div className={style.module}>
                                <a href={sbUrls} target={'_blank'}>
                                    <SiStorybook  />
                                </a>
                            </div>
                            <h3>Открыть storybook</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
