import {FC} from 'react';
import {LayoutTitleProps} from "./Layout.model";
import style from "../../Graphql.module.scss";
import {showContextMenu} from "../../Graphql.utils";
import {Expanded} from "../Expanded";

export const LayoutTitle: FC<LayoutTitleProps> = ({
                                                      title,
                                                      expanded,
                                                      toggleExpanded,
                                                      setContextMenu,
                                                      mainBranch,
                                                      editable,
                                                      children
                                                  }) => {
    return (
        <div className={style[`${mainBranch ? 'blockTitle' : 'branchTitle'}`]}
             onContextMenu={(e) => showContextMenu(e, setContextMenu)}>
            {
                editable && children
                    ? children
                    : <span>{title}</span>
            }
            <div className={style.actions}>
                <Expanded expand={expanded} toggle={toggleExpanded}/>
            </div>
        </div>
    );
};
