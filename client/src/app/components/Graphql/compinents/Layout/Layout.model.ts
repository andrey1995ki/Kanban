import {ReactNode} from "react";
import {SetContextMenuType} from "../../Graphql.model";

export interface LayoutProps {
    children: ReactNode
}

export interface LayoutTitleProps {
    title: string
    expanded: boolean
    toggleExpanded: () => void
    setContextMenu: SetContextMenuType
    mainBranch?: boolean
    children?: ReactNode
    editable?: boolean
}
