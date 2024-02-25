import {FC} from "react";
import {ApolloResult, BoardProps} from "../../Graphql.model";
import {useQuery} from "@apollo/client";
import {Task} from "../Task/Task";
import {notLastChild} from "../../Graphql.utils";

export const Column: FC<BoardProps> = ({type, id, filterKey}) => {
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