import {FC, useEffect, useState} from 'react';
import {MainLayoutProps} from "./MainLayout.model";
import {MainLayoutComponent} from "./MainLayout.component";
import {useGetBoardsQuery} from "../../store/api/api";
import {useDispatch} from "react-redux";
import {setBoards} from "../../store/app/app.slice";
import {LoaderMain} from "../../../assets/common/components/Loader/LoaderMain";

export const MainLayout: FC<MainLayoutProps> = ({children}) => {
    const [displaySider, setDisplaySider] = useState(true)
    const dispatch = useDispatch()
    const {data: boards, isLoading: boardsIsLoading} = useGetBoardsQuery('')
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const scheme = prefersDarkScheme ? "light-theme" : "dark-theme"
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(prefersDarkScheme)
    useEffect(() => {
        if (!boardsIsLoading && boards) {
            dispatch(setBoards(boards))
        }
    }, [boards, boardsIsLoading, dispatch])
    if (boardsIsLoading && !boards) {
        return <LoaderMain/>
    }
    return <MainLayoutComponent children={children} displaySider={displaySider} setDisplaySider={setDisplaySider}
                                scheme={scheme}
                                setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme}/>
}
