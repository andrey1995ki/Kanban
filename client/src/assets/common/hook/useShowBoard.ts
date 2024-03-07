import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppSelector} from "../../../app/store/app/app.selector";
import {API} from "../../../app/store/api/api";
import {UserSelector} from "../../../app/store/user/user.selector";

export const useShowBoard = () => {
    const {boardId} = useParams()
    const {boards} = useSelector(AppSelector)
    const {isAuth} = useSelector(UserSelector)
    // Проверяем присутствует доска среди новосозданыхх
    const newBoard = boards.filter(board => board.id === boardId)?.[0]
    // Получаем список всех досок из API
    const {board} = API.useGetBoardsQuery('', {
        selectFromResult: ({data}) => ({
            board: data?.filter(board => board.id === boardId)
        }),
    })
    if (!isAuth) {
        return {toRedirect: true, boardId}
    }
    const toRedirect = board?.length === 0 && !newBoard
    return {toRedirect, boardId}


}
