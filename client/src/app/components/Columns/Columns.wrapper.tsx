import {FC, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {API} from "../../store/api/api";
import {Columns} from "./Columns";
import {useSelector} from "react-redux";
import {AppSelector} from "../../store/app/app.selector";

export const ColumnsWrapper: FC = () => {
    const navigate = useNavigate()
    const {boardId} = useParams()
    const {boards} = useSelector(AppSelector)
    // Проверяем присутствует доска среди новосозданыхх
    const newBoard = boards.filter(board => board.id === boardId)?.[0]
    // Получаем список всех досок из API
    const {board} = API.useGetBoardsQuery('', {
        selectFromResult: ({data}) => ({
            board: data?.filter(board => board.id === boardId)
        }),
    })
    useEffect(() => {
        if (board?.length === 0 && newBoard) {
            navigate("/");
        }
    }, [board, navigate, newBoard])

    return (
        <Columns boardId={boardId as string}/>
    );
};
