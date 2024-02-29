import {FC} from 'react';
import style from "../../Graphql.module.scss";
import {LayoutProps} from "./Layout.model";

export const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={style.layout}>
            <div className={style.content}>
                <div className={style.block}>
                    {children}
                </div>
            </div>
        </div>
    );
};
