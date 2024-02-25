import {FC} from 'react';
import {useMutation} from "@apollo/client";
import {TOGGLE_TASK} from "../../../../../graphql/query";
import {ContextState} from "../../../Graphql.model";
import {ToggleTaskProps} from "../Common/Mutation.model";

export const ToggleTask: FC<ToggleTaskProps> = ({id, done, setContextMenu}) => {
    const [toggleTask] = useMutation(TOGGLE_TASK)
    const onToggle = async () => {
        await setContextMenu((state: ContextState) => ({...state, show: false}))
        if (done) {
            const submitToggle = confirm('Вернуть задачу в работу?')
            if (!submitToggle) return
        }
        await toggleTask({
            variables: {
                done: !done,
                task_id: id
            }
        })
    }
    return (
        <button onClick={() => onToggle()}>{done ? 'Вернуть в работу' : 'Выполнить'}</button>
    );
};