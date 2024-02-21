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
    const newBoard = boards.filter(board => board.id === boardId)
    const {board} = API.useGetBoardsQuery('', {
        selectFromResult: ({data}) => ({
            board: data?.filter(board => board.id === boardId)
        }),
    })
    useEffect(() => {
        if (board?.length === 0 && newBoard.length === 0) {
            navigate("/");
        }
    }, [board, navigate, newBoard])

    return (
        <Columns boardId={boardId as string}/>
    );
};
