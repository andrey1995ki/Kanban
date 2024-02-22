import {FC} from 'react';
import {useQuery} from "@apollo/client";
import {ApolloResult, BranchProps} from "../Graphql.model";
import {Task} from "./Task";

export const TaskLayout: FC<BranchProps> = ({type, filterKey, id}) => {
    const {data} = useQuery(type, {
        variables: {
            filter: {
                [filterKey]: id
            }
        }
    })
    return (
        <>
            {data?.tasks.map((task: ApolloResult) => <Task title={task.title} key={task.id}/>)}
        </>
    );
};