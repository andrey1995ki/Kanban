import {useQuery} from "@apollo/client";
import {FC} from "react";
import {ApolloResult, BoardProps} from "../../Graphql.model";
import {ColumnLayout} from "../Column/ColumnLayout";
import {notLastChild} from "../../Graphql.utils";

export const Board: FC<BoardProps> = ({type, id, filterKey}) => {
    const {data} = useQuery(type, {
        variables: {
            filter: {
                [filterKey]: id
            }
        }
    })
    return (
        <>
            {data?.columns.map((column: ApolloResult, index: number) => (
                <ColumnLayout title={column.title} id={column.id} notLast={notLastChild(data?.columns.length, index)}
                              key={column.id}/>
            ))}
        </>
    )
}
