import {useQuery} from "@apollo/client";
import {FC} from "react";
import {ApolloResult, BranchProps} from "../Graphql.model";
import {Layout} from "./Layout";
import {CREATE_TASK, TASKS} from "../../../graphql/query";
import {TaskLayout} from "./TaskLayout";

export const Branch:FC<BranchProps> = ({type,id, filterKey}) => {
    const {data} = useQuery(type, {
        variables: {
            filter: {
                [filterKey]: id
            }
        }
    })
    console.log(data);
    return (
        <>
            {data?.columns.map((column:ApolloResult)=>(
                <Layout title={column.title} dependentType={TASKS} inputType={CREATE_TASK} cacheParam={'tasks'}
                        newParam={'newTask'} id={column.id} idParam={'column_id'} key={column.id}>
                    <TaskLayout id={column.id} filterKey={'column_id'} type={TASKS}/>
                </Layout>
            ))}
        </>
    );
}