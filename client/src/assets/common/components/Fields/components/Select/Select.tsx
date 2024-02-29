import {forwardRef} from "react";
import {SelectProps} from "../../Fields.model";
import style from "../../Fields.module.scss";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
                                                                      onChange,
                                                                      onBlur,
                                                                      name,
                                                                      label,
                                                                      options, value
                                                                  }, ref) => {
    return (
        <div className={`${style.select} ${style.withOutLabel}`}>
            {
                label && <label className={style.label}>{label}</label>
            }
            <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} value={value}>
                {options}
            </select>
        </div>
    );
})
