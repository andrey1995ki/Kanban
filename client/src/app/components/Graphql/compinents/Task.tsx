import style from "../Graphql.module.scss";
import {FC} from "react";
import {TaskProps} from "../Graphql.model";
import {BsCheckSquareFill, BsFillDashSquareFill, BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

export const Task: FC<TaskProps> = ({title, done, id, notLast}) => {
    return (
        <div className={`${style.block} ${notLast ? style.notLastBlock : ''}`}>
            <div className={style.branchTitle}>
                <span>{title}</span>
                <div className={style.actions}>
                    {
                        done ? <BsCheckSquareFill/>
                            : <BsFillDashSquareFill/>
                    }
                    <div className={style.moreActions}>
                        <BsFillPencilFill/>
                        <BsFillTrashFill/>
                    </div>
                </div>
            </div>
        </div>
    )
}
