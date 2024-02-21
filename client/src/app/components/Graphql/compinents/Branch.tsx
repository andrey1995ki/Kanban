import {FC} from "react";
import {ApolloResult, BranchProps} from "../Graphql.model";
import style from "../Graphql.module.scss";
import {useQuery} from "@apollo/client";
import {Layout} from "./Layout";

export const Branch: FC<BranchProps> = (props) => {
    const {title, id, filterKey, type, inputType} = props
    const {data, loading} = useQuery(type, {
        variables: {
            filter: {
                [filterKey]: id
            }
        }
    })
    console.log(title, data, loading);
    return (
        <div className={style.block}>
            <Layout title={title} dependentType={type} inputType={inputType} cacheParam={'columns'} newParam={'newColumn'} id={id} idParam={'board_id'}>
                {data?.columns.map((column: ApolloResult) => <div key={column.id}
                                                                  className={style.branchTitle}>{column.title}</div>)}
            </Layout>
        </div>
    );
};
