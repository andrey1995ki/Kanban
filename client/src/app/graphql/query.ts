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
