import {FC} from "react";
import {ExpandedProps} from "../Graphql.model";
import {BsCaretDownSquareFill, BsCaretUpSquareFill} from "react-icons/bs";
import style from "../Graphql.module.scss";

export const Expanded:FC<ExpandedProps> = ({expand,toggle}) => {
    if (expand) return <BsCaretDownSquareFill onClick={()=>toggle()} className={style.icon}/>
    return <BsCaretUpSquareFill onClick={()=>toggle()} className={style.icon}/>
};
