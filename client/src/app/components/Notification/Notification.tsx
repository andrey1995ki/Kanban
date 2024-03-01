import {memo, useCallback, useEffect} from 'react';
import style from './Notification.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {TaskSelector} from "../../store/task/task.selector";
import {AppDispatch} from "../../store/store";
import {deleteMessages} from "../../store/task/task.slice";
import {Notificator} from "./components/Notificator";

export const Notification = memo(() => {
    const {messages} = useSelector(TaskSelector)
    const dispatch = useDispatch<AppDispatch>()
    const activityNotification = useCallback((notificatorId: string) => {
        const timer = setTimeout(() => {
            dispatch(deleteMessages({id: notificatorId}))
            clearTimeout(timer)
        }, 30000)
    }, [dispatch])
    useEffect(() => {
        const lastMessage = messages.slice(-1)[0];
        if (lastMessage) activityNotification(lastMessage.id)
    }, [messages, dispatch, activityNotification])
    return (
        <div className={style.notification}>
            {messages.map((notificator) => <Notificator key={notificator.id} {...notificator}/>)}
        </div>
    );
})
