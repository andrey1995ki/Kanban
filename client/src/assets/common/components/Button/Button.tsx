import React, {FC} from 'react';
import style from './Button.module.scss'
import {ButtonProps} from "./Button.model";
import {Loader} from "../Loader/Loader";

export const Button: FC<ButtonProps> = (props) => {
    const {title, type = 'default', icon, loading, onClick: clickFunc, buttonType = 'button'} = props
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        clickFunc && clickFunc(e)
    }
    return (
        <button className={style[`button--${type}`]}
                onClick={onClick} type={buttonType}>
            <div className={style.title}>
                {
                    icon && <div className={style.icon}>{icon}</div>
                }
                <h4>{title}</h4>
                {
                    loading && <Loader/>
                }
            </div>
        </button>
    );
}
