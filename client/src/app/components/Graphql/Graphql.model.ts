import {DocumentNode} from "graphql";
import {OperationVariables, TypedDocumentNode} from "@apollo/client";
import {ReactElement} from "react";

export interface BranchProps {
    title: string
    id: number
    filterKey: 'board_id' | 'column_id'
    type: ApolloQueryType
    inputType: ApolloQueryType
}

export interface ExpandedProps {
    expand: boolean
    toggle: () => void
}

export type ApolloResult = { id: number, title: string }
type ApolloQueryType = DocumentNode | TypedDocumentNode<any, OperationVariables>

export interface InputProps {
    type: ApolloQueryType
    value?: string
    hide: (hid: boolean) => void
    dependentType: ApolloQueryType
    cacheParam:string
    newParam:string
    id?:number
    idParam?:string
}

export interface LayoutProps {
    title: string
    children: ReactElement
    inputType: ApolloQueryType
    dependentType: ApolloQueryType
    mainBranch?: boolean
    cacheParam:string
    newParam:string
    id?:number
    idParam?:string
}
