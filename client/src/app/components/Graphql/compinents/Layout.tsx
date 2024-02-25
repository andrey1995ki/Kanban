import style from "../Graphql.module.scss";
import {Expanded} from "./Expanded";
import {Input} from "./Input";
import {useBranch} from "../../../../assets/common/hook/useBranch";
import {FC, MouseEvent, useRef, useState} from "react";
import {ContextState, LayoutProps} from "../Graphql.model";
import {ContextMenu} from "./ContextMenu";

export const Layout: FC<LayoutProps> = (props) => {
    const {
        title,
        children,
        mainBranch,
        id,
        notLast,
        enumerate,
        canChange = true
    } = props
    const {Create, Dependent} = enumerate
    const {expanded, toggleExpanded} = useBranch()
    const [contextMenu, setContextMenu] = useState<ContextState>({x: 0, y: 0, show: false})
    const [addElem, setAddElem] = useState(false)
    const [editElem, setEditElem] = useState(false)
    console.log(editElem);
    const ref = useRef<HTMLDivElement>(null)
    const showContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setContextMenu({show: true, x: e.pageX, y: e.pageY})
    }
    const selectOnContext = (callback: () => void) => {
        setContextMenu((state) => ({...state, show: false}))
        callback()
    }

    return (
        <div className={`${style.block} ${notLast ? style.notLastBlock : ''}`} ref={ref}>
            <div className={style[`${mainBranch ? 'blockTitle' : 'branchTitle'}`]} onContextMenu={showContextMenu}>
                {<span>{title}</span>
                }

                <div className={style.actions}>
                    <Expanded expand={expanded} toggle={toggleExpanded}/>
                </div>
            </div>
            <div className={style.branchBlock}>
                {
                    expanded
                    && children
                }
                {
                    addElem &&
                    <Input hide={setAddElem} type={Create} dependentType={Dependent} id={id} enumerate={enumerate}
                    />
                }
            </div>
            <ContextMenu setShowContext={(show) => setContextMenu((state) => ({...state, show: show}))}
                         contextState={contextMenu}>
                <>
                    <button onClick={() => selectOnContext(() => setAddElem(true))}>Добавить</button>
                    {
                        canChange &&
                        <>
                            <button onClick={() => selectOnContext(() => setEditElem(true))}>Изменить</button>
                            <button>Удалить</button>
                        </>
                    }
                </>
            </ContextMenu>
        </div>
    );
};
