import style from "./Loader.module.scss"
import {Loader} from "./Loader";

export const LoaderMain = () => {
    return (
        <div className={style.loadingLayout}>
            <Loader/>
        </div>
    );
};

