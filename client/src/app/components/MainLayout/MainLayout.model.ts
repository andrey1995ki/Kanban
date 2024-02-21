import {ReactElement} from "react";

export interface MainLayoutProps {
    children: ReactElement
}

export interface MainLayoutComponentProps extends MainLayoutProps {
    displaySider: boolean
    setDisplaySider: (displaySider: boolean) => void
    scheme: "light-theme" | "dark-theme"
    isDarkTheme: boolean
    setIsDarkTheme: (isDarkTheme: boolean) => void
}
