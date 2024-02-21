import style from "../Sider.module.scss";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {SiderButtonProps} from "../Sider.model";
import {FC, memo} from "react";
import {Link} from "react-router-dom";

export const SiderButton: FC<SiderButtonProps> = memo(({active, board,}) => {
    return (
        <div className={style[`board${active ? '--active' : ''}`]}>
            <MdOutlineSpaceDashboard className={style.boardIcon}/>
            <Link to={`/boards/${board.id}`} className={style.link}>{board.title}</Link>
        </div>
    );
})
