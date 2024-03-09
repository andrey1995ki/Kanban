import React, {FC, useRef} from "react";
import {AccessBoardColumnProps} from "../../Header.model";
import style from "../../Header.module.scss";
import {AccessBoardItem} from "./AccessBoardItem";
import {EmptySvg} from "../../../../../assets/svg/components/Empty";

export const AccessBoardColumn: FC<AccessBoardColumnProps> = ({data, type, title, mutation, boardId}) => {
    const ref = useRef<HTMLDivElement>(null)
    const dragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        ref.current?.classList.add(style.dragging);
    }
    const dragEnd = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        ref.current?.classList.remove(style.dragging);
    }
    const dropEvent = async (event: React.DragEvent<HTMLDivElement>): Promise<void> => {
        event.preventDefault();
        ref.current?.classList.remove(style.dragging);
        const data = event.dataTransfer?.getData('text');
        const dropData = data ? JSON.parse(data) : {}
        if (type !== dropData.type) {
            mutation({user_id: dropData.user_id, board_id: boardId})
        }
    }
    return (
        <div className={style.accessColumn}>
            <span>{title}</span>
            <div className={style.column} ref={ref} onDragOver={dragOver} onDragLeave={dragEnd} onDrop={dropEvent}>
                {
                    data.length>0
                    ? data.map(item => <AccessBoardItem type={type} key={item.id} {...item}/>)
                    : <EmptySvg title={'Пользователи отсутствуют'}/>
                }
            </div>
        </div>
    );
};
