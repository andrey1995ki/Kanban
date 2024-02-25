import {useMutation} from "@apollo/client";
import {DeleteItemProps} from "../Common/Mutation.model";
import {FC} from "react";
import {DELETE_BOARD} from "../../../../../graphql/query";
import {DeleteLayout} from "../Common/DeleteLayout";

export const DeleteBoard: FC<DeleteItemProps> = ({id, setContextMenu}) => {
    const [deleteBoard] = useMutation(DELETE_BOARD, {
        update(cache, {data: {removeItem}}) {
            cache.modify({
                fields: {
                    allBoards(currentItem = []) {
                        return currentItem.filter((item: any) => item.__ref !== `Board:${removeItem.id}`)
                    }
                }
            })
        }
    })
    return <DeleteLayout funcMutation={deleteBoard} id={id} setContextMenu={setContextMenu}/>
}