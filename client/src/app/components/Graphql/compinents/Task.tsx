import style from "../Graphql.module.scss";
import {FC} from "react";
import {TaskProps} from "../Graphql.model";
import {BsCheckSquareFill, BsFillDashSquareFill} from "react-icons/bs";

export const Task: FC<TaskProps> = ({title, done, notLast}) => {
    return (
        <div className={`${style.block} ${notLast ? style.notLastBlock : ''}`}>
            <div className={style.branchTitle}>
                <span>{title}</span>
                <div className={style.actions}>
                    {
                        done ? <BsCheckSquareFill/>
                            : <BsFillDashSquareFill/>
                    }
                </div>
            </div>
        </div>
    )
}
