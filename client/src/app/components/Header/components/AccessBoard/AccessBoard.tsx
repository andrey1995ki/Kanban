import {FC} from "react";
import {AccessBoardProps} from "../../Header.model";
import {
    useAddUserToBoardsMutation,
    useDeleteUserFromBoardsMutation,
    useGetAllUsersQuery,
    useGetUserToBoardQuery
} from "../../../../store/api/api";
import {LoaderMain} from "../../../../../assets/common/components/Loader/LoaderMain";
import style from "../../Header.module.scss";
import {AccessBoardColumn} from "./AccessBoardColumn";

export const AccessBoard: FC<AccessBoardProps> = ({boardId}) => {
    const {data: users, isLoading: usersLoading} = useGetAllUsersQuery('')
    const {data: accessUsers, isLoading: accessLoading} = useGetUserToBoardQuery(boardId)
    const [addUser, {isLoading: addUserLoading}] = useAddUserToBoardsMutation()
    const [deleteUser, {isLoading: deleteUserLoading}] = useDeleteUserFromBoardsMutation()
    if (usersLoading || accessLoading || addUserLoading || deleteUserLoading) {
        return <div className={style.accessBlockLoading}><LoaderMain/></div>
    }
    const remainingUsers = users?.filter(user => !accessUsers?.find(accessUser => accessUser.id === user.id))
    return (
        <div className={style.accessBlock}>
            <AccessBoardColumn title={'Доступна'} type={'delete'} data={accessUsers || []} mutation={addUser}
                               boardId={boardId}/>
            <AccessBoardColumn title={'Остальные пользователи'} type={'add'} data={remainingUsers || []}
                               mutation={deleteUser} boardId={boardId}/>
        </div>
    );
};
