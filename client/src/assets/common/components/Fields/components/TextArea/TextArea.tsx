import {forwardRef} from "react";
import {InputProps} from "../../Fields.model";
import style from "../../Fields.module.scss";

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(({
                                                                           onChange,
                                                                           onBlur,
                                                                           name,
                                                                           label,
                                                                           errors,
                                                                           placeholder
                                                                       }, ref) => {
    return (
        <div className={style.inputTextArea}>
            <label className={style.label}>{label}</label>
            <textarea placeholder={placeholder} name={name} ref={ref} onChange={onChange} onBlur={onBlur} rows={5}/>
            <span className={style.errors}>{errors}</span>
        </div>
    );
})
