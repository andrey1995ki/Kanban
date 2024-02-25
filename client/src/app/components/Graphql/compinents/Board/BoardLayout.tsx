import {FC, useState} from "react";
import {BoardLayoutProps, ContextState} from "../../Graphql.model";
import style from "../../Graphql.module.scss";
import {Board} from "./Board";
import {useBranch} from "../../../../../assets/common/hook/useBranch";
import {LayoutTitle} from "../Layout/LayoutTitle";
import {selectOnContext} from "../../Graphql.utils";
import {ContextMenu} from "../ContextMenu";
import {AddSubElem} from "../Mutation/Common/AddSubElem";
import {CHANGE_BOARD, COLUMNS, CREATE_COLUMN} from "../../../../graphql/query";
import {EditItem} from "../Mutation/Common/EditItem";
import {DeleteBoard} from "../Mutation/Board/DeleteBoard";

export const BoardLayout: FC<BoardLayoutProps> = (props) => {
    const {title, id, notLast} = props
    const [addElem, setAddElem] = useState(false)
    const [edit, setEdit] = useState(false)
    const {expanded, toggleExpanded} = useBranch()
    const [contextMenu, setContextMenu] = useState<ContextState>({x: 0, y: 0, show: false})
    return (
        <>
            <div className={`${style.block} ${notLast ? style.notLastBlock : ''}`}>
                <LayoutTitle title={title} expanded={expanded} toggleExpanded={toggleExpanded}
                             setContextMenu={setContextMenu} editable={edit}>
                    <EditItem id={id} value={title} hide={setEdit} mutationType={CHANGE_BOARD} param={'board_id'}/>
                </LayoutTitle>
                <div className={style.branchBlock}>
                    {
                        expanded &&
                        <Board filterKey={'board_id'} id={id} type={COLUMNS}/>
                    }
                    {
                        addElem &&
                        <AddSubElem hide={setAddElem} id={id} cacheParam={'columns'} cacheType={COLUMNS}
                                    mutationType={CREATE_COLUMN} filterParam={'board_id'} mutationName={'newColumn'}/>
                    }
                </div>
            </div>
            <ContextMenu setShowContext={(show) => setContextMenu((state) => ({...state, show: show}))}
                         contextState={contextMenu}>
                <>
                    <button onClick={() => selectOnContext(() => setAddElem(true), setContextMenu)}>Добавить</button>
                    <button onClick={() => selectOnContext(() => setEdit(true), setContextMenu)}>Переименовать</button>
                    <DeleteBoard id={id} setContextMenu={setContextMenu}/>
                </>
            </ContextMenu>
        </>

    );
};
