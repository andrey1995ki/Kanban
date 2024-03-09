import {JSXElementConstructor, ReactElement} from "react";
import {ApiChangeUserToBoardPayload, ApiLoginResponse} from "../../store/api/api.model";

export interface HeaderComponentProps {
    title: string
    showBtn: boolean
    navigate: (link: string) => void
    toggleModal: () => void
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>
    isAuth: boolean
    logout: () => void
}

export interface HeaderOptionsProps {
    showBtn: boolean
    boardId?: string
}

export type HeaderOptionsChild = ReactElement<unknown, string | JSXElementConstructor<unknown>>

export interface HeaderOptionsModal {
    child: HeaderOptionsChild
    title: string
}

export interface AccessBoardProps {
    boardId: string
}

export interface AccessBoardColumnProps {
    boardId: string
    title: string
    type: 'add' | 'delete'
    data: Array<Omit<ApiLoginResponse, 'token'>>
    mutation: (payload:ApiChangeUserToBoardPayload) => void
}

export interface AccessBoardItemProps extends Omit<ApiLoginResponse, 'token'> {
    type: 'add' | 'delete'
}
