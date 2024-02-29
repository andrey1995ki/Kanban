import {ApiBoardsResponse} from "../../store/api/api.model";

/**
 * Функция возвращающая волидцию формы по длине символов
 * @param countChars
 */
export const maxLengthValid = (countChars: number): { value: number, message: string } => {
    return {
        value: countChars,
        message: `Название недолжно превышать ${countChars} символов`
    }
}
/**
 * Функция проверяющая наличие доски по имени
 * @param boards массив досок
 * @param title заголовок доски
 */
export const boardsExist = (boards: Array<ApiBoardsResponse>, title: string): boolean => {
    return !!boards?.find(board => board.title.trim() === title.trim())
}
