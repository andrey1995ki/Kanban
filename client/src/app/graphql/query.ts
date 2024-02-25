import {gql} from '@apollo/client'

export const ALL_BOARD = gql`
    query AllBoards {
      boards: allBoards{
            id
            title
          }
        }
`
export const CREATE_BOARD = gql`
    mutation createBoard($title:String!) {
        newBoard: createBoard(title:$title){
            id
            title
        }
    }
`
export const CHANGE_BOARD = gql`
    mutation updateBoard($board_id: ID! $title: String){
      changeBoard: updateBoard(id:$board_id title:$title){
        id
        title
      }
    }
`
export const DELETE_BOARD = gql`
    mutation removeBoard($id: ID!){
      removeItem: removeBoard(id:$id){
        id
      }
    }
`
export const COLUMNS = gql`
    query columns($filter:ColumnFilter) {
      columns: allColumns(filter:$filter){
        id
        title
        board_id
      }
    }
`
export const CREATE_COLUMN = gql`
    mutation createColumn($title:String!,$board_id:ID!) {
        newColumn: createColumn(title:$title,board_id:$board_id){
            id
            title
            board_id
        }
    }
`
export const CHANGE_COLUMN = gql`
    mutation updateColumn($column_id: ID! $title: String){
      changeColumn: updateColumn(id:$column_id title:$title){
        id
        title
      }
    }
`
export const DELETE_COLUMN = gql`
    mutation removeColumn($id: ID!){
      removeColumn(id:$id){
        id
      }
    }
`
export const TASKS = gql`
    query tasks($filter:TaskFilter) {
      tasks: allTasks(filter:$filter){
        id
        title
        done
      }
    }
`
export const CREATE_TASK = gql`
    mutation createTask($title:String! $column_id: ID!){
      newTask: createTask(title:$title column_id:$column_id done:false){
        id
        title
        done
      }
    }
`
export const CHANGE_TASK = gql`
    mutation updateTask($task_id: ID! $title: String){
      changeTask: updateTask(id:$task_id title:$title){
        id
        title
      }
    }
`
export const DELETE_TASK = gql`
    mutation removeTask($id: ID!){
      removeItem: removeTask(id:$id){
        id
      }
    }
`
export const TOGGLE_TASK = gql`
    mutation updateTask($task_id: ID! $done: Boolean){
      changeTask: updateTask(id:$task_id done:$done){
        id
        done
      }
    }
`