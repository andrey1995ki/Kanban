import {RefObject} from "react";
import {ApolloQueryType, SetContextMenuType} from "../../../Graphql.model";

export interface InputLayoutProps {
    value?: string
    ref: RefObject<HTMLInputElement>
    loading: boolean
    submit: () => void
    hide: (hide: boolean) => void
}

export interface AddBoardsProps {
    hide: (hide: boolean) => void
}

export interface AddItemProps extends AddBoardsProps {
    id: number
    filterParam: 'board_id' | 'column_id'
    cacheParam: 'columns' | 'tasks'
    mutationType: ApolloQueryType
    cacheType: ApolloQueryType
    mutationName: 'newTask' | 'newColumn'
}

export interface EditItemProps extends AddBoardsProps {
    id: number
    value: string
    mutationType: ApolloQueryType
    param: 'board_id' | 'column_id' | 'task_id'
}

export interface DeleteItemProps {
    id: number
    setContextMenu: SetContextMenuType
}

export interface DeleteLayoutProps extends DeleteItemProps {
    funcMutation: (param: { variables: any }) => void
}

export interface ToggleTaskProps {
    id: number
    setContextMenu: SetContextMenuType
    done: boolean
}
