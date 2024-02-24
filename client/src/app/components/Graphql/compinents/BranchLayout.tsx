import {FC} from "react";
import {BranchLayoutProps} from "../Graphql.model";
import style from "../Graphql.module.scss";
import {Layout} from "./Layout";
import {Branch} from "./Branch";

export const BranchLayout: FC<BranchLayoutProps> = (props) => {
    const {title, id, filterKey, type, inputType, notLast} = props
    return (
        <div className={`${style.block} ${notLast ? style.notLastBlock :''}`}>
            <Layout title={title} dependentType={type} inputType={inputType} cacheParam={'columns'}
                    newParam={'newColumn'} id={id} idParam={'board_id'}>
                <Branch filterKey={filterKey} id={id} type={type}/>
            </Layout>
        </div>
    );
};
