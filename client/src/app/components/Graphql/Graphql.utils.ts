import {MouseEvent} from "react";
import {ContextState, SetContextMenuType} from "./Graphql.model";

export const notLastChild = (lengthData: number, indexElem: number) => {
    return !(lengthData === indexElem + 1)
}
export const showContextMenu = (e: MouseEvent<HTMLDivElement>, setContextMenu: SetContextMenuType) => {
    e.preventDefault()
    setContextMenu({show: true, x: e.pageX, y: e.pageY})
}

export const selectOnContext = (callback: () => void, setContextMenu: SetContextMenuType) => {
    setContextMenu((state: ContextState) => ({...state, show: false}))
    callback()
}
