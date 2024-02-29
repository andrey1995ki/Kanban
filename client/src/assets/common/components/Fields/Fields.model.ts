import {UseFormRegisterReturn} from "react-hook-form/dist/types/form";
import {JSXElementConstructor, ReactElement} from "react";

export interface InputProps extends UseFormRegisterReturn {
    label?: string
    errors?: string
    placeholder?: string
    disabled?: boolean
}

export interface SelectProps extends UseFormRegisterReturn {
    label?: string
    options: Array<ReactElement<unknown, string | JSXElementConstructor<unknown>>>
    value?: string
}
