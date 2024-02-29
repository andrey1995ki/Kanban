import style from "../../../Graphql.module.scss";
import {Loader} from "../../../../../../assets/common/components/Loader/Loader";
import {BsCheckSquareFill, BsXSquareFill} from "react-icons/bs";
import {ChangeEvent, forwardRef, useState} from "react";
import {InputLayoutProps} from "./Mutation.model";

export const InputLayout = forwardRef<HTMLInputElement, InputLayoutProps>(({
                                                                               value: initValue,
                                                                               submit,
                                                                               loading,
                                                                               hide
                                                                           }, ref) => {
    const [value, setValue] = useState<string>(initValue || '')
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const blur = () => {
        const timer = setTimeout(() => {
            hide(false)
            clearTimeout(timer)
        }, 200)

    }
    return (
        <div className={style.input}>
            <input value={value} onChange={change} ref={ref} autoFocus onBlur={blur}/>
            {
                loading ?
                    <Loader/>
                    : <BsCheckSquareFill className={style.icon} onClick={() => submit()}/>
            }
            <BsXSquareFill className={style.icon} onClick={() => hide(false)}/>
        </div>
    );
})
