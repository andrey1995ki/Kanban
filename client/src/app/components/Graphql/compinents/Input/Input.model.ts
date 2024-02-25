import {RefObject} from "react";

export interface InputLayoutProps {
    value?: string
    ref: RefObject<HTMLInputElement>
    loading: boolean
    submit: () => void
    hide: (hide: boolean) => void
}
export interface AddBoardsProps{
    hide: (hide: boolean) => void
}
export interface AddColumnProps extends AddBoardsProps{
    board_id: number
}
