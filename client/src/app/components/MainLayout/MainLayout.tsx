import {FC, useState} from 'react';
import {MainLayoutProps} from "./MainLayout.model";
import {MainLayoutComponent} from "./MainLayout.component";
import {LoaderMain} from "../../../assets/common/components/Loader/LoaderMain";
import {useInitialApp} from "../../../assets/common/hook/useInitialApp";

export const MainLayout: FC<MainLayoutProps> = ({children}) => {
    const [displaySider, setDisplaySider] = useState(true)
    const {loading} = useInitialApp()
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const scheme = prefersDarkScheme ? "light-theme" : "dark-theme"
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(prefersDarkScheme)
    if (loading) {
        return <LoaderMain/>
    }
    return <MainLayoutComponent children={children} displaySider={displaySider} setDisplaySider={setDisplaySider}
                                scheme={scheme}
                                setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme}/>
}
