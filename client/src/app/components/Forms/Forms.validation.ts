import {ApiBoardsResponse} from "../../store/api/api.model";

export const maxLengthValid = (countChars: number): { value: number, message: string } => {
    return {
        value: countChars,
        message: `Название недолжно превышать ${countChars} символов`
    }
}
export const boardsExist = (boards: Array<ApiBoardsResponse>, title: string): boolean => {
    return !!boards?.find(board => board.title.trim() === title.trim())
}
