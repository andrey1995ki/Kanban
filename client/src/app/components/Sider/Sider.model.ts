import {ApiBoardsResponse} from "../../store/api/api.model";
import React from "react";

export interface SiderProps {
    setDisplaySider: (displaySider: boolean)=>void
    scheme: "light-theme" | "dark-theme"
    isDarkTheme: boolean
    setIsDarkTheme: (isDarkTheme: boolean) => void
}

export interface SiderComponentProps {
    changeTheme: (e: React.ChangeEvent<HTMLInputElement>) => void
    isDarkTheme: boolean
    boards: Array<ApiBoardsResponse>
    activeBoards: string | undefined
    setShowModal: () => void
    setDisplaySider: (displaySider: boolean)=>void
}

export interface SiderButtonProps {
    active: boolean
    board: ApiBoardsResponse
}

