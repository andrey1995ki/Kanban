import {FC} from 'react';
import {useQuery} from "@apollo/client";
import {ApolloResult, BranchProps} from "../Graphql.model";
import {Task} from "./Task";
import {notLastChild} from "../Graphql.utils";

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
            {data?.tasks.map((task: ApolloResult, index: number) => <Task title={task.title} key={task.id} id={task.id}
                                                                          done={!!task.done}
                                                                          notLast={notLastChild(data?.tasks.length, index)}/>)}
        </>
    );
};
