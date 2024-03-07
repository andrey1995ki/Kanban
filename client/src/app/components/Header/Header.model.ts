import {JSXElementConstructor, ReactElement} from "react";

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
}

export type HeaderOptionsChild = ReactElement<unknown, string | JSXElementConstructor<unknown>>

export interface HeaderOptionsModal {
    child: HeaderOptionsChild
    title: string
}

