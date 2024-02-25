import {DocumentNode} from "graphql";
import {OperationVariables, TypedDocumentNode} from "@apollo/client";
import {Dispatch, ReactElement, SetStateAction} from "react";

export interface BranchLayoutProps {
    title: string
    id: number
    notLast?: boolean
}

export interface BranchProps {
    id: number
    type: ApolloQueryType
    filterKey: string
}

export interface ExpandedProps {
    expand: boolean
    toggle: () => void
}

export type ApolloResult = { id: number, title: string, done?: boolean }
type ApolloQueryType = DocumentNode | TypedDocumentNode<any, OperationVariables>

export interface ApolloDataEnum {
    Create: ApolloQueryType
    Update?: ApolloQueryType
    Delete?: ApolloQueryType
    Dependent: ApolloQueryType
    NewParam: string
    CacheParam: string
    DependsParam?: string
}

export interface InputProps {
    type: ApolloQueryType
    requestType?: 'update' | 'delete'
    value?: string
    hide: (hid: boolean) => void
    dependentType: ApolloQueryType
    id?: number
    enumerate: ApolloDataEnum
}

export interface ApolloPayload extends Partial<{ [key: string]: string | number }> {
    title: string

}

export interface LayoutProps {
    title: string
    children: ReactElement
    mainBranch?: boolean
    id?: number
    notLast?: boolean
    canChange?: boolean
    enumerate: ApolloDataEnum
    changeElem: ReactElement
}

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
