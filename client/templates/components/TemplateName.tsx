import {FC} from 'react';
import style from './TemplateName.module.scss'
import {TemplateNameProps} from "./TemplateName.model";

export const TemplateName:FC<TemplateNameProps> =(props) => {
    const {...props} = props
    return (
        <div className={style.templateName}>

        </div>
    );
}
