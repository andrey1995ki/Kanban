import style from "../Graphql.module.scss";
import {Expanded} from "./Expanded";
import {BsFillPencilFill, BsFillTrashFill, BsPlusSquareFill} from "react-icons/bs";
import {Input} from "./Input";
import {useBranch} from "../../../../assets/common/hook/useBranch";
import {FC, useState,MouseEvent} from "react";
import {LayoutProps} from "../Graphql.model";

export const Layout: FC<LayoutProps> = (props) => {
    const {title, children, inputType, dependentType, mainBranch, cacheParam, newParam, id, idParam, notLast} = props
    const {expanded, toggleExpanded} = useBranch()
    const [addElem, setAddElem] = useState(false)
    const showContextMenu = (e: MouseEvent<HTMLDivElement>)=>{
        e.preventDefault()
        console.log(e);
    }
    return (
        <div className={`${style.block} ${notLast ? style.notLastBlock :''}`} onContextMenu={showContextMenu}>
            <div className={style[`${mainBranch ? 'blockTitle' : 'branchTitle'}`]}>
                <span>{title}</span>
                <div className={style.actions}>
                    <Expanded expand={expanded} toggle={toggleExpanded}/>
                    {expanded &&
                    <div className={style.moreActions}>
                        <BsPlusSquareFill onClick={() => setAddElem(true)}/>
                        <BsFillPencilFill/>
                        <BsFillTrashFill/>
                    </div>
                    }
                </div>
            </div>
            <div className={style.branchBlock}>
                {
                    expanded
                    && children
                }
                {
                    addElem &&
                    <Input hide={setAddElem} type={inputType} dependentType={dependentType} cacheParam={cacheParam}
                           newParam={newParam} id={id} idParam={idParam}
                    />
                }
            </div>
        </div>
    );
};
