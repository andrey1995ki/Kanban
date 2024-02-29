import {MouseEvent} from "react";
import {ContextState, SetContextMenuType} from "./Graphql.model";

/**
 * Функция проверяющая является ли элемент последним
 * @param lengthData длина массива
 * @param indexElem текущий индекс
 */
export const notLastChild = (lengthData: number, indexElem: number) => {
    return !(lengthData === indexElem + 1)
}
/**
 * Функция вызывающая кастомное контекствное меню
 * @param e
 * @param setContextMenu функция установки даных для контестного меню
 */
export const showContextMenu = (e: MouseEvent<HTMLDivElement>, setContextMenu: SetContextMenuType) => {
    e.preventDefault()
    setContextMenu({show: true, x: e.pageX, y: e.pageY})
}
/**
 * Выполнение функция вызваной из контекстного меню и его закрытие
 * @param callback функция вызваная из контекстного меню
 * @param setContextMenu
 */
export const selectOnContext = (callback: () => void, setContextMenu: SetContextMenuType) => {
    setContextMenu((state: ContextState) => ({...state, show: false}))
    callback()
}
