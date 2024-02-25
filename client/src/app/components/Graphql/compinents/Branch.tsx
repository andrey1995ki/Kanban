import {useQuery} from "@apollo/client";
import {FC} from "react";
import {ApolloResult, BranchProps} from "../Graphql.model";
import style from "../Graphql.module.scss";

export const Branch: FC<BranchProps> = ({type, id, filterKey}) => {
    const {data} = useQuery(type, {
        variables: {
            filter: {
                [filterKey]: id
            }
        }
    })
    return(
        <>
            {data?.columns.map((column: ApolloResult, index:number) => (
                <div className={style.block} key={index}>
                    {column.title}
                </div>
                ))}
        </>
    )
    // return (
    //     <>
    //         {data?.columns.map((column: ApolloResult, index:number) => (
    //             <Layout title={column.title} id={column.id} key={column.id}
    //                     notLast={notLastChild(data?.columns.length, index)} enumerate={Task} changeElem={<input/>}>
    //                 <TaskLayout id={column.id} filterKey={'column_id'} type={TASKS}/>
    //             </Layout>
    //         ))}
    //     </>
    // );
}
