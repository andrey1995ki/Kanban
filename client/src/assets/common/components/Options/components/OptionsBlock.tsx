import {FC, useEffect, useRef} from "react";
import style from "../Options.module.scss";
import {OptionsBlockProps} from "../Options.model";

export const OptionsBlock: FC<OptionsBlockProps> = ({setShowOptions, optionsArray}) => {
    const ref = useRef<HTMLDivElement>(null)
    /**
     * Функция отслеживющая клик вне элемента
     * @param e
     */
    const mouseClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setShowOptions(false)
        }
    }
    const clickOnOptions = (func: () => void) => {
        func()
        setShowOptions(false)
    }
    const children = optionsArray.map((options, index) => <button key={index}
                                                                  onClick={() => clickOnOptions(options.callback)}>{options.title}</button>)
    useEffect(() => {
        document.addEventListener("mousedown", mouseClick)
        return () => {
            document.removeEventListener("mousedown", mouseClick)
        }
    })
    return (
        <div className={style.optionsBlock} ref={ref}>
            {children}
        </div>
    );
};
