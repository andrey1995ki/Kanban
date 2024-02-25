import {DocumentNode} from "graphql";
import {OperationVariables, TypedDocumentNode} from "@apollo/client";
import {Dispatch, ReactElement, SetStateAction} from "react";

export interface BoardLayoutProps {
    title: string
    id: number
    notLast?: boolean
}

export interface BoardProps {
    id: number
    type: ApolloQueryType
    filterKey: string
}

export interface ExpandedProps {
    expand: boolean
    toggle: () => void
}

export type ApolloResult = { id: number, title: string, done?: boolean }
export type ApolloQueryType = DocumentNode | TypedDocumentNode<any, OperationVariables>


export interface TaskProps {
    title: string
    id: number
    done: boolean
    notLast?: boolean
}

export interface ContextState {
    x: number
    y: number
    show: boolean
}

export type SetContextMenuType = Dispatch<SetStateAction<ContextState>>

export interface ContextMenuProps {
    contextState: ContextState
    setShowContext: (showContext: boolean) => void
    children: ReactElement
}
