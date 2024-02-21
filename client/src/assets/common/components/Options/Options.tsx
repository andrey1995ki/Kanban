import {FC, useState} from 'react';
import style from './Options.module.scss'
import {OptionsProps} from "./Options.model";
import {SlOptionsVertical} from "react-icons/sl";
import {OptionsBlock} from "./components/OptionsBlock";

export const Options: FC<OptionsProps> = ({optionsArray}) => {
    const [showOptions, setShowOptions] = useState(false)
    return (
        <div className={style.options}>
            <div className={style.optionsBtn}>
                <SlOptionsVertical onClick={() => setShowOptions(!showOptions)}/>
                {showOptions && <OptionsBlock setShowOptions={setShowOptions} optionsArray={optionsArray}/>}
            </div>
        </div>
    );
}
