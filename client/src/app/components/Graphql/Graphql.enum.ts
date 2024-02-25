import {
    ALL_BOARD,
    CHANGE_BOARD,
    CHANGE_COLUMN,
    COLUMNS,
    CREATE_BOARD,
    CREATE_COLUMN,
    CREATE_TASK, DELETE_COLUMN,
    TASKS
} from "../../graphql/query";
import {ApolloDataEnum} from "./Graphql.model";

export const Board: ApolloDataEnum = {
    Create: CREATE_BOARD,
    Dependent: ALL_BOARD,
    NewParam: 'newBoard',
    CacheParam: 'boards'
}

export const Column: ApolloDataEnum = {
    Create: CREATE_COLUMN,
    Update: CHANGE_BOARD,
    Dependent: COLUMNS,
    NewParam: 'newColumn',
    CacheParam: 'columns',
    DependsParam: 'board_id'
}

export const Task: ApolloDataEnum = {
    Create: CREATE_TASK,
    Update: CHANGE_COLUMN,
    Delete: DELETE_COLUMN,
    Dependent: TASKS,
    NewParam: 'newTask',
    CacheParam: 'tasks',
    DependsParam: 'column_id'
}
