import {FC} from 'react';
import style from './ErrorPage.module.scss'
import {ErrorPageProps} from "./ErrorPage.model";
import {BiSolidError} from "react-icons/bi";

export const ErrorPage: FC<ErrorPageProps> = () => {
    // const error = useRouteError();
    return (
        <div className={style.errorPage}>
            <div className={style.errorBlock}>
                <div className={style.label}>
                    <BiSolidError/>
                </div>
                <div className={style.title}>
                    <h3>
                        Возникла непредвиденная ошибка
                    </h3>
                </div>
                <div className={style.body}>
                    <i></i>
                </div>
            </div>
        </div>
    );
}
