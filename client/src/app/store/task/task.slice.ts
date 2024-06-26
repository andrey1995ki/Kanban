import {DeleteMessagesAction, editTaskData, SetMessagesAction, SetTaskAction, TaskState} from "./task.model";
import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {TaskApi} from "../../websocket/websocket";
import {WSAddTaskPayload, WSTaskResponse} from "../../websocket/websocket.model";

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: '',
    messages: []
}

export const getTask = createAsyncThunk(
    'task/getTask',
    async function (boardId: string, {rejectWithValue, dispatch}) {
        try {
            TaskApi.start()
            TaskApi.getTasks((taskData: Array<WSTaskResponse>) => dispatch(setTask({
                boardId: boardId,
                tasks: taskData
            })), (messages: string) => dispatch(setMessages({messages})))
        } catch (error: any) {
            TaskApi.stop()
            return rejectWithValue(error?.message || 'Ошибка')
        }
    }
)
export const addTask = createAsyncThunk(
    'task/addTask',
    async function (taskData: WSAddTaskPayload, {rejectWithValue}) {
        try {
            TaskApi.addTask(taskData)
        } catch (error: any) {
            TaskApi.stop()
            return rejectWithValue(error?.message || 'Ошибка')
        }
    }
)
export const editTask = createAsyncThunk(
    'task/addTask',
    async function ({taskData, taskId}: editTaskData, {rejectWithValue}) {
        try {
            TaskApi.editTask(taskData, taskId)
        } catch (error: any) {
            TaskApi.stop()
            return rejectWithValue(error?.message || 'Ошибка')
        }
    }
)
export const deleteTask = createAsyncThunk(
    'task/addTask',
    async function (taskId: string, {rejectWithValue}) {
        try {
            TaskApi.deleteTask(taskId)
        } catch (error: any) {
            TaskApi.stop()
            return rejectWithValue(error?.message || 'Ошибка')
        }
    }
)


const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask: (state, actions: PayloadAction<SetTaskAction>) => {
            const {tasks, boardId} = actions.payload
            const currBoardTask = tasks?.filter(task => task.board_id === boardId)
            if (!current(state).tasks.some((item) => item.board === boardId)) {
                state.tasks = [...state.tasks, {board: boardId, boardTasks: currBoardTask}]
            } else {
                state.tasks = current(state).tasks.map(item => {
                    if (item.board === boardId) {
                        return {...item, boardTasks: currBoardTask}
                    } else return item
                })
            }

        },
        setMessages: (state, actions: PayloadAction<SetMessagesAction>) => {
            const {messages} = actions.payload
            state.messages = [...current(state).messages,{id:(+new Date).toString(16), message: messages}]
        },
        deleteMessages: (state, actions: PayloadAction<DeleteMessagesAction>) => {
            const {id} = actions.payload
            state.messages = current(state).messages.filter(item=> item.id !== id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTask.pending, (state: typeof initialState) => {
            state.loading = true
        })
        builder.addCase(getTask.fulfilled, (state: typeof initialState) => {
            state.loading = false
        })
        builder.addCase(getTask.rejected, (state: typeof initialState, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    },
})
export const {setTask, setMessages, deleteMessages} = TaskSlice.actions
export default TaskSlice.reducer
