import React, {FC} from "react";
import {AccessBoardItemProps} from "../../Header.model";
import style from "../../Header.module.scss";

export const AccessBoardItem: FC<AccessBoardItemProps> = ({name, login,id, type}) => {
    const onDragElement = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer?.setData('text', JSON.stringify({user_id: id, type:type}));
    }
    return (
        <div className={style.columnItem} draggable onDragStart={onDragElement}>
            <div>{name}</div>
            <span>{login}</span>
        </div>
    );
};
