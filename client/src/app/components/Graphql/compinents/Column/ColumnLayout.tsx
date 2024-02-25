import {FC, useState} from "react";
import {BoardLayoutProps, ContextState} from "../../Graphql.model";
import {useBranch} from "../../../../../assets/common/hook/useBranch";
import style from "../../Graphql.module.scss";
import {LayoutTitle} from "../Layout/LayoutTitle";
import {EditItem} from "../Mutation/Common/EditItem";
import {CHANGE_COLUMN, CREATE_TASK, TASKS} from "../../../../graphql/query";
import {AddSubElem} from "../Mutation/Common/AddSubElem";
import {ContextMenu} from "../ContextMenu";
import {selectOnContext} from "../../Graphql.utils";
import {Column} from "./Column";
import {DeleteColumn} from "../Mutation/Column/DeleteColumn";

export const ColumnLayout: FC<BoardLayoutProps> = (props) => {
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
                    <EditItem id={id} value={title} hide={setEdit} mutationType={CHANGE_COLUMN} param={'column_id'}/>
                </LayoutTitle>
                <div className={style.branchBlock}>
                    {
                        expanded &&
                        <Column filterKey={'column_id'} id={id} type={TASKS}/>
                    }
                    {
                        addElem &&
                        <AddSubElem hide={setAddElem} id={id} cacheType={TASKS} cacheParam={'tasks'}
                                    mutationType={CREATE_TASK} filterParam={'column_id'} mutationName={'newTask'}/>
                    }
                </div>
            </div>
            <ContextMenu setShowContext={(show) => setContextMenu((state) => ({...state, show: show}))}
                         contextState={contextMenu}>
                <>
                    <button onClick={() => selectOnContext(() => setAddElem(true), setContextMenu)}>Добавить</button>
                    <button onClick={() => selectOnContext(() => setEdit(true), setContextMenu)}>Переименовать</button>
                    <DeleteColumn id={id} setContextMenu={setContextMenu}/>
                </>
            </ContextMenu>
        </>
    );
};