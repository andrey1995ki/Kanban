import {FC, useState} from "react";
import {BranchLayoutProps, ContextState} from "../Graphql.model";
import style from "../Graphql.module.scss";
import {Branch} from "./Branch";
import {useBranch} from "../../../../assets/common/hook/useBranch";
import {LayoutTitle} from "./Layout/LayoutTitle";
import {selectOnContext} from "../Graphql.utils";
import {ContextMenu} from "./ContextMenu";
import {AddColumn} from "./Input/AddColumn";
import {COLUMNS} from "../../../graphql/query";

export const BranchLayout: FC<BranchLayoutProps> = (props) => {
    const {title, id, notLast} = props
    const [addElem, setAddElem] = useState(false)
    const {expanded, toggleExpanded} = useBranch()
    const [contextMenu, setContextMenu] = useState<ContextState>({x: 0, y: 0, show: false})
    return (
        <>
            <div className={`${style.block} ${notLast ? style.notLastBlock : ''}`}>
                <LayoutTitle title={title} expanded={expanded} toggleExpanded={toggleExpanded}
                             setContextMenu={setContextMenu}/>
                <div className={style.branchBlock}>
                    {
                        expanded &&
                        <Branch filterKey={'board_id'} id={id} type={COLUMNS}/>
                    }
                    {
                        addElem &&
                        <AddColumn hide={setAddElem} board_id={id}/>
                    }
                </div>
            </div>
            <ContextMenu setShowContext={(show) => setContextMenu((state) => ({...state, show: show}))}
                         contextState={contextMenu}>
                <button onClick={() => selectOnContext(() => setAddElem(true), setContextMenu)}>Добавить</button>
            </ContextMenu>
        </>

    );
};
