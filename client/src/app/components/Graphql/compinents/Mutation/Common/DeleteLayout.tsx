import {FC} from 'react';
import {ContextState} from "../../../Graphql.model";
import {DeleteLayoutProps} from "./Mutation.model";

export const DeleteLayout: FC<DeleteLayoutProps> = ({id, setContextMenu, funcMutation}) => {
    const del = async () => {
        await funcMutation({variables: {id: id}})
        await setContextMenu((state: ContextState) => ({...state, show: false}))
    }
    return (
        <button onClick={() => del()}>Удалить</button>
    );
};
