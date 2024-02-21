import style from "../Graphql.module.scss";
import {Expanded} from "./Expanded";
import {BsPlusSquareFill} from "react-icons/bs";
import {Input} from "./Input";
import {useBranch} from "../../../../assets/common/hook/useBranch";
import {FC, useState} from "react";
import {LayoutProps} from "../Graphql.model";

export const Layout: FC<LayoutProps> = (props) => {
    const {title, children, inputType, dependentType, mainBranch, cacheParam, newParam, id, idParam} = props
    const {expanded, toggleExpanded} = useBranch()
    const [addElem, setAddElem] = useState(false)
    return (
        <div className={style.block}>
            <div className={style[`${mainBranch ? 'blockTitle' : 'branchTitle'}`]}>
                <span>{title}</span>
                <div className={style.actions}>
                    <Expanded expand={expanded} toggle={toggleExpanded}/>
                    {expanded &&
                    <div className={style.moreActions}>
                        <BsPlusSquareFill onClick={() => setAddElem(true)}/></div>}
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
