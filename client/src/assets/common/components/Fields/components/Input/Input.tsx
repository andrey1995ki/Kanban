import {ChangeEvent, forwardRef, useState} from 'react';
import style from '../../Fields.module.scss'
import {InputProps} from "../../Fields.model";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                                   onChange,
                                                                   onBlur,
                                                                   name,
                                                                   label,
                                                                   errors,
                                                                   placeholder, disabled = false, isPassword
                                                               }, ref) => {
    const [inputType, setInputType] = useState(isPassword ? 'password' : 'text')
    const showPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setInputType('text')
        } else {
            setInputType('password')
        }
    }
    return (
        <div className={`${style.input} ${!label ? style.withOutLabel : ''}`}>
            {
                label && <label className={style.label}>{label}</label>
            }
            <input placeholder={placeholder} name={name} ref={ref} onChange={onChange} onBlur={onBlur}
                   type={inputType}
                   disabled={disabled}/>
            {
                isPassword &&
                <label><input type="checkbox" onChange={showPassword}/> Показать пароль</label>
            }
            <span className={style.errors}>{errors}</span>
        </div>
    );
})
