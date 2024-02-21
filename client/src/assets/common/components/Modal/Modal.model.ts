import {JSXElementConstructor, ReactElement} from "react";

export interface ModalProps{
    showModal: boolean
    setShowModal:()=>void
    title?: string
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>
}
