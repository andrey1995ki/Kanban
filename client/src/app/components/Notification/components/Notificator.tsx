import {FC} from "react";
import {NotificatorProps} from "../Notification.model";
import style from "../Notification.module.scss";
import {GrClose} from "react-icons/gr";
import {deleteMessages} from "../../../store/task/task.slice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";

export const Notificator: FC<NotificatorProps> = ({message, id}) => {
    const dispatch = useDispatch<AppDispatch>()
    const closeNotification = () => {
        dispatch(deleteMessages({id: id}))
    }
    return (
        <div className={style.notificator}>
            <div className={style.closeNotificator} onClick={() => closeNotification()}><GrClose/></div>
            <div className={style.textNotificator}>
                {message}
            </div>
        </div>
    );
};
