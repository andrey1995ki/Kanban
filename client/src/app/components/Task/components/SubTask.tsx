import {ChangeEvent, FC, memo} from "react";
import {SubTaskProps} from "../Task.model";
import style from '../Task.module.scss'

export const SubTask: FC<SubTaskProps> = memo(({title, final, id, toggleSubTask, editable}) => {
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        if (!editable) {
            return;
        }
        if (final) {
            const acceptToggle = confirm(`Вернуть подзадачу ${title} в работу?`)
            if (!acceptToggle) return
        }
        toggleSubTask(id, e.target.checked)
    }
    return (
        <div className={`${style.subTaskData} ${final ? style.subTaskDone : ''}`}>
            <label className={style.checkbox}>
                <input type={'checkbox'} checked={final} onChange={(e) => change(e)}/>
                <span className={style.inputSpan}/>
            </label>
            <span>{title}</span>
        </div>
    );
})
