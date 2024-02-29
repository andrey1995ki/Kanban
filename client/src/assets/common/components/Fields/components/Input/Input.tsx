import {forwardRef} from 'react';
import style from '../../Fields.module.scss'
import {InputProps} from "../../Fields.model";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                                   onChange,
                                                                   onBlur,
                                                                   name,
                                                                   label,
                                                                   errors,
                                                                   placeholder, disabled = false
                                                               }, ref) => {
    return (
        <div className={`${style.input} ${!label ? style.withOutLabel : ''}`}>
            {
                label && <label className={style.label}>{label}</label>
            }
            <input placeholder={placeholder} name={name} ref={ref} onChange={onChange} onBlur={onBlur} type={'text'}
                   disabled={disabled}/>
            <span className={style.errors}>{errors}</span>
        </div>
    );
})
