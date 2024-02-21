import style from "./Loader.module.scss"
import {AiOutlineLoading3Quarters} from "react-icons/ai";

export const Loader = () => {
    return (
        <AiOutlineLoading3Quarters className={style.loading}/>
    );
};

