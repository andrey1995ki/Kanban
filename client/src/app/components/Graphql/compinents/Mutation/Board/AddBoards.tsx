import {FC, useRef} from 'react';
import {InputLayout} from "../Common/InputLayout";
import {useMutation} from "@apollo/client";
import {ALL_BOARD, CREATE_BOARD} from "../../../../../graphql/query";
import {AddBoardsProps} from "../Common/Mutation.model";

export const AddBoards: FC<AddBoardsProps> = ({hide}) => {
    const ref = useRef<HTMLInputElement>(null)
    const [funcMutation, {loading}] = useMutation(CREATE_BOARD, {
        update(cache, {data}) {
            const {boards}: any = cache.readQuery({query: ALL_BOARD})
            cache.writeQuery({
                query: ALL_BOARD,
                data: {
                    boards: [...boards, data['newBoard']]
                }
            })
        }
    })
    const submit = async () => {
        await funcMutation({
            variables: {
                title: ref.current?.value
            }
        })
        hide(false)
    }
    return (
        <InputLayout ref={ref} submit={submit} hide={hide} loading={loading}/>
    );
};
