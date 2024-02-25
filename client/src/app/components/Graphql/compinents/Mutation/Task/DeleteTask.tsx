import {FC} from "react";
import {DeleteItemProps} from "../Common/Mutation.model";
import {useMutation} from "@apollo/client";
import {DELETE_TASK} from "../../../../../graphql/query";
import {DeleteLayout} from "../Common/DeleteLayout";

export const DeleteTask: FC<DeleteItemProps> = ({id, setContextMenu}) => {
    const [deleteTask] = useMutation(DELETE_TASK, {
        update(cache, {data: {removeItem}}) {
            cache.modify({
                fields: {
                    allTasks(currentItem = []) {
                        return currentItem.filter((item: any) => item.__ref !== `Task:${removeItem.id}`)
                    }
                }
            })
        }
    })
    return <DeleteLayout funcMutation={deleteTask} id={id} setContextMenu={setContextMenu}/>
}