import {FC, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {ContextMenuProps} from "../Graphql.model";
import style from "../Graphql.module.scss";

export const ContextMenu: FC<ContextMenuProps> = ({contextState, setShowContext, children}) => {
    const {show, x: xPosition, y: yPosition} = contextState
    const ref = useRef<HTMLDivElement>(null)
    const mouseClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setShowContext(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", mouseClick)
        return () => {
            document.removeEventListener("mousedown", mouseClick)
        }
    })
    return show ?
        ReactDOM.createPortal(
            <div className={style.contextMenu} ref={ref} style={{top: yPosition, left: xPosition}}>
                {children}
            </div>
            , document.body)
        : null
}
