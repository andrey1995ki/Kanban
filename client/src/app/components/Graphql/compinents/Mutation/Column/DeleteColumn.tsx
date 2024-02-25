import {FC} from "react";
import {DeleteItemProps} from "../Common/Mutation.model";
import {useMutation} from "@apollo/client";
import {DELETE_COLUMN} from "../../../../../graphql/query";
import {DeleteLayout} from "../Common/DeleteLayout";

export const DeleteColumn: FC<DeleteItemProps> = ({id, setContextMenu}) => {
    const [deleteColumn] = useMutation(DELETE_COLUMN, {
        update(cache, {data: {removeColumn}}) {
            console.log(cache);
            cache.modify({
                fields: {
                    allColumns(currentItem = []) {
                        console.log(currentItem);
                        return currentItem.filter((item: any) => item.__ref !== `Column:${removeColumn.id}`)
                    }
                }
            })
        }
    })
    return <DeleteLayout funcMutation={deleteColumn} id={id} setContextMenu={setContextMenu}/>
}