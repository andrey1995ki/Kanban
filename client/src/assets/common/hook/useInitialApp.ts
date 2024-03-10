import {useDispatch} from "react-redux";
import {useGetBoardsQuery, useGetUserQuery} from "../../../app/store/api/api";
import {useEffect} from "react";
import {setBoards} from "../../../app/store/app/app.slice";
import {setUser} from "../../../app/store/user/user.slice";

export const useInitialApp = () => {
    const dispatch = useDispatch()
    const {data: user, isLoading: userIsLoading} = useGetUserQuery('')
    const {data: boards, isLoading: boardsIsLoading} = useGetBoardsQuery('')
    useEffect(() => {
        if (!boardsIsLoading && boards) {
            dispatch(setBoards(boards))
        }
    }, [boards, boardsIsLoading, dispatch])
    useEffect(() => {
        if (!userIsLoading && user?.id) {
            const {id, login, name} = user
            dispatch(setUser({id: id, login: login!, name: name!}))
        }
    })
    const loading = boardsIsLoading && !boards && userIsLoading
    return {loading}
}
