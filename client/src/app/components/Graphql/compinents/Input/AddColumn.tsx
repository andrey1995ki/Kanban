import {FC, useRef} from 'react';
import {InputLayout} from "./InputLayout";
import {useMutation} from "@apollo/client";
import {COLUMNS, CREATE_COLUMN} from "../../../../graphql/query";
import {AddColumnProps} from "./Input.model";

export const AddColumn: FC<AddColumnProps> = ({board_id, hide}) => {
    const ref = useRef<HTMLInputElement>(null)
    const variables = {
        "filter": {board_id: board_id}
    }
    const [funcMutation, {loading}] = useMutation(CREATE_COLUMN, {
        update(cache, {data}) {
            const {columns}: any = cache.readQuery({query: COLUMNS, variables}) || [{}]
            console.log(columns);
            if (columns) {
                cache.writeQuery({
                    query: COLUMNS,
                    data: {
                        columns: [...columns, data['newColumn']]
                    },
                    variables
                })
            }
        }
    })
    const submit = async () => {
        await funcMutation({
            variables: {
                title: ref.current?.value,
                board_id: board_id
            }
        })
        hide(false)
    }
    return (<InputLayout ref={ref} submit={submit} hide={hide} loading={loading}/>);
};
