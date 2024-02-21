import React, {FC, memo} from 'react';
import {ColumnComponentProps} from "../Columns.model";
import style from "../Columns.module.scss";
import {MdDoneOutline} from "react-icons/md";

export const ColumnComponent: FC<ColumnComponentProps> = memo((props) => {
    const {color, final_stage, columnRef, title, dragOver, dragEnd, dropEvent, children} = props

    return (
        <div className={style.column} onDragOver={dragOver} onDragLeave={dragEnd} onDrop={dropEvent}
             ref={columnRef as React.RefObject<HTMLDivElement>}>
            <div className={style.columnLayout}>
                <div className={style.titleColumn}>
                    <span className={style.color} style={{background: color}}/>
                    <div className={style.title}>
                        <span>{title}</span>
                        {
                            final_stage && <MdDoneOutline className={style.doneTitle} title={'Финальный этап'}/>
                        }
                    </div>
                </div>
                <div className={style.tasks}>
                    {children}
                </div>
            </div>
        </div>
    );
})
