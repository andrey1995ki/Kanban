import {FC} from 'react';
import {MainLayoutComponentProps} from "./MainLayout.model";
import style from './MainLayout.module.scss'
import {Sider} from "../Sider";
import {Header} from "../Header";
import {AiOutlineMenuUnfold} from "react-icons/ai";
import {Notification} from "../Notification";

export const MainLayoutComponent: FC<MainLayoutComponentProps> = ({
                                                                      children,
                                                                      displaySider,
                                                                      setDisplaySider,
                                                                      scheme,
                                                                      setIsDarkTheme,
                                                                      isDarkTheme
                                                                  }) => {

    return (
        <>
            <div className={style[`mainLayout${displaySider ? '--sider' : ''}`]}>
                <Header/>
                {
                    displaySider && <Sider setDisplaySider={setDisplaySider} scheme={scheme} isDarkTheme={isDarkTheme}
                                           setIsDarkTheme={setIsDarkTheme}/>
                }
                <div className={style.layout}>
                    <div className={style.content}>
                        {children}
                        {
                            !displaySider &&
                            <div onClick={() => setDisplaySider(true)} className={style.showSider}>
                                <AiOutlineMenuUnfold/>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Notification/>
        </>

    );
};
