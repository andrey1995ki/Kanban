import style from "../../Graphql.module.scss";
import {FC, useState} from "react";
import {ContextState, TaskProps} from "../../Graphql.model";
import {BsCheckSquareFill, BsFillDashSquareFill} from "react-icons/bs";
import {CHANGE_TASK} from "../../../../graphql/query";
import {EditItem} from "../Mutation/Common/EditItem";
import {selectOnContext, showContextMenu} from "../../Graphql.utils";
import {ContextMenu} from "../ContextMenu";
import {DeleteTask} from "../Mutation/Task/DeleteTask";
import {ToggleTask} from "../Mutation/Task/ToggleTask";

export const Task: FC<TaskProps> = ({title, done, notLast, id}) => {
    const [edit, setEdit] = useState(false)
    const [contextMenu, setContextMenu] = useState<ContextState>({x: 0, y: 0, show: false})
    return (
        <>
            <div className={`${style.block} ${notLast ? style.notLastBlock : ''}`}>
                <div className={style.branchTitle} onContextMenu={(e) => showContextMenu(e, setContextMenu)}>
                    {
                        edit ? <EditItem id={id} value={title} hide={setEdit} mutationType={CHANGE_TASK}
                                         param={'task_id'}/>
                            : <span>{title}</span>
                    }
                    <div className={style.actions}>
                        {
                            done ? <BsCheckSquareFill/>
                                : <BsFillDashSquareFill/>
                        }
                    </div>
                </div>
            </div>
            <ContextMenu setShowContext={(show) => setContextMenu((state) => ({...state, show: show}))}
                         contextState={contextMenu}>
                <>
                    <ToggleTask id={id} setContextMenu={setContextMenu} done={done}/>
                    <button onClick={() => selectOnContext(() => setEdit(true), setContextMenu)}>Переименовать</button>
                    <DeleteTask id={id} setContextMenu={setContextMenu}/>
                </>
            </ContextMenu>
        </>


    )
}
