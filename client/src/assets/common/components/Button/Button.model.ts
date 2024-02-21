import React, {ReactElement} from "react";

export interface ButtonProps {
    title: string
    icon?: ReactElement
    type?: 'default' | 'primary'
    loading?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    buttonType?:'button' | 'submit'
}
