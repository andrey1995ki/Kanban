import {FC, useEffect} from 'react';
import {ColumnsProps} from "./Columns.model";
import {useModal} from "../../../assets/common/hook/useModal";
import {ColumnsComponent} from "./Columns.component";
import {useGetBoardColumnQuery} from "../../store/api/api";
import {Skeleton} from "../../../assets/common/components/Skeleton";
import {useDispatch} from "react-redux";
import {setColumn} from "../../store/app/app.slice";
// import {getTask} from "../../store/task/task.slice";
import {AppDispatch} from "../../store/store";

export const Columns: FC<ColumnsProps> = ({boardId}) => {
    const {showModal, toggleModal} = useModal()
    const dispatch = useDispatch<AppDispatch>()
    const {data: boardData, isLoading} = useGetBoardColumnQuery(boardId)
    useEffect(() => {
        boardData && dispatch(setColumn(boardData))
    }, [boardData, dispatch])
    // useEffect(()=>{
    //     dispatch(getTask(boardId))
    // },[boardId,dispatch])
    if (isLoading && !boardData) {
        return <Skeleton/>
    }
    return <ColumnsComponent boardId={boardId} boardData={boardData!} showModal={showModal} toggleModal={toggleModal}/>
}
