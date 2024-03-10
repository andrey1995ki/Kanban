import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Columns} from "./Columns";
import {useShowBoard} from "../../../assets/common/hook/useShowBoard";

export const ColumnsWrapper: FC = () => {
    const navigate = useNavigate()
    const {toRedirect, boardId} = useShowBoard()
    useEffect(() => {
        if (toRedirect) {
            navigate("/");
        }
    }, [toRedirect, navigate])

    return (
        <Columns boardId={boardId as string}/>
    );
};
