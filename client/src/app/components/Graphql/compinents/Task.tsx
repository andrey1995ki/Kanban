import style from "../Graphql.module.scss";
import {FC} from "react";
import {TaskProps} from "../Graphql.model";

export const Task:FC<TaskProps> = ({title}) => {
    return (
        <div className={style.block}>
            <div className={style.branchTitle}>
                <span>{title}</span>
                <div className={style.actions}>
                </div>
            </div>
        </div>
    )
}