import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    ApiAddBoardColumnPayload,
    ApiAddBoardPayload,
    ApiAddTaskPayload,
    ApiAuthResponse,
    ApiBoardColumnResponse,
    ApiBoardsResponse, ApiChangeUserToBoardPayload,
    ApiLogin,
    ApiLoginResponse,
    ApiRegistration,
    ApiTaskResponse,
    ApiToggleTaskPayload
} from "./api.model";
import {sortResponse} from "./api.utils";
import {RootState} from "../store";
import {getTokenInCooke} from "../user/user.utils";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_BASE_URL || ''
const port = import.meta.env.VITE_BASE_API_PORT || ''
const baseUrl = `http://localhost${port}${url}/api/`
export const API = createApi({
    reducerPath: 'API',
    tagTypes: ['Task', 'Boards', 'Column', 'Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).user.token || getTokenInCooke()
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getBoards: builder.query<Array<ApiBoardsResponse>, unknown>({
            query: () => ({
                url: 'board'
            }),
            providesTags: (result) => result
                ? [...result.map(({id}) => ({type: 'Boards', id} as const)),
                    {type: 'Boards', id: 'LIST'}]
                : [{type: 'Boards', id: 'LIST'}]
        }),
        getBoardColumn: builder.query<Array<ApiBoardColumnResponse>, string>({
            query: (board_id) => ({
                url: `board_column?board_id=${board_id}`
            }),
            providesTags: (result) => result
                ? [...result.map(({id}) => ({type: 'Column', id} as const)),
                    {type: 'Column', id: 'LIST'}]
                : [{type: 'Column', id: 'LIST'}],
            transformResponse: (response: Array<ApiBoardColumnResponse>) => sortResponse(response, 'final_stage'),
        }),
        getTasks: builder.query<Array<ApiTaskResponse>, string>({
            query: (board_column_id) => ({
                url: `task?board_column_id=${board_column_id}`
            }),
            providesTags: (result) => result
                ? [...result.map(({id}) => ({type: 'Task', id} as const)),
                    {type: 'Task', id: 'LIST'}]
                : [{type: 'Task', id: 'LIST'}],
        }),
        changeBoardColumn: builder.mutation<ApiTaskResponse, { taskId: string, board_column_id: string }>({
            query(data) {
                const {taskId, board_column_id} = data
                return {
                    url: `task/${taskId}`,
                    method: 'PATCH',
                    body: {
                        board_column_id: board_column_id
                    }
                }
            },
            invalidatesTags: [{type: 'Task', id: 'LIST'}]
        }),
        addBoard: builder.mutation<ApiBoardsResponse, ApiAddBoardPayload>({
            query: (body) => ({
                url: 'board',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Boards', id: 'LIST'}]
        }),
        deleteBoard: builder.mutation<ApiBoardsResponse, string>({
            query: (id) => ({
                url: `board/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Boards', id: 'LIST'}]
        }),
        changeBoardName: builder.mutation<ApiTaskResponse, { boardID: string, title: string }>({
            query(data) {
                const {title, boardID} = data
                return {
                    url: `board/${boardID}`,
                    method: 'PATCH',
                    body: {
                        title: title
                    }
                }
            },
            invalidatesTags: [{type: 'Boards', id: 'LIST'}]
        }),
        addBoardColumn: builder.mutation<ApiBoardColumnResponse, ApiAddBoardColumnPayload>({
            query: (body) => ({
                url: 'board_column',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Column', id: 'LIST'}]
        }),
        deleteBoardColumn: builder.mutation<ApiBoardColumnResponse, string>({
            query: (id) => ({
                url: `board_column/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Column', id: 'LIST'}]
        }),
        editBoardColumn: builder.mutation<ApiBoardColumnResponse, { id: string, body: ApiAddBoardColumnPayload }>({
            query(data) {
                const {body, id} = data
                return {
                    url: `board_column/${id}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: [{type: 'Column', id: 'LIST'}]
        }),
        addTask: builder.mutation<ApiTaskResponse, ApiAddTaskPayload>({
            query: (body) => ({
                url: 'task',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Task', id: 'LIST'}]
        }),
        toggleSubTask: builder.mutation<ApiTaskResponse, ApiToggleTaskPayload>({
            query(data) {
                const {body, taskId} = data
                return {
                    url: `task/${taskId}`,
                    method: 'PATCH',
                    body: {
                        sub_task: body
                    }
                }
            },
            invalidatesTags: [{type: 'Task', id: 'LIST'}]
        }),
        changeTask: builder.mutation<ApiTaskResponse, ApiAddTaskPayload & { taskId: string }>({
            query(data) {
                const {taskId, ...body} = data
                return {
                    url: `task/${taskId}`,
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: [{type: 'Task', id: 'LIST'}]
        }),
        deleteTask: builder.mutation<ApiTaskResponse, string>({
            query: (id) => ({
                url: `task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Task', id: 'LIST'}]
        }),
        login: builder.mutation<ApiLoginResponse, ApiLogin>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            }),
            transformResponse: (response: ApiLoginResponse) => {
                Cookies.set('token', response.token, {expires: 1})
                return response
            },
            invalidatesTags: [{type: 'Boards', id: 'LIST'}]
        }),
        registration: builder.mutation<ApiAuthResponse, ApiRegistration>({
            query: (body) => ({
                url: 'auth/registration',
                method: 'POST',
                body
            }),
        }),
        getUser: builder.query<Omit<ApiLoginResponse, 'token'>, unknown>({
            query: () => ({
                url: `auth/user`
            }),
            keepUnusedDataFor: 1
        }),
        getAllUsers: builder.query<Array<Omit<ApiLoginResponse, 'token'>>, unknown>({
            query: () => ({
                url: `users`
            }),
        }),
        getUserToBoard: builder.query<Array<Omit<ApiLoginResponse, 'token'>>, string>({
            query: (board_id) => ({
                url: `board/${board_id}/users`
            }),
            providesTags: (result) => result
                ? [...result.map(({id}) => ({type: 'Users', id} as const)),
                    {type: 'Users', id: 'LIST'}]
                : [{type: 'Users', id: 'LIST'}],
        }),
        addUserToBoards: builder.mutation<undefined, ApiChangeUserToBoardPayload>({
            query(data) {
                const {user_id, board_id} = data
                return {
                    url: `board/${board_id}/users`,
                    method: 'PATCH',
                    body: {
                        user_id
                    }
                }
            },
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
        deleteUserFromBoards: builder.mutation<undefined, ApiChangeUserToBoardPayload>({
            query(data) {
                const {user_id, board_id} = data
                return {
                    url: `board/${board_id}/users`,
                    method: 'DELETE',
                    body: {
                        user_id
                    }
                }
            },
            invalidatesTags: [{type: 'Users', id: 'LIST'}]
        }),
    })
})

export const {
    useGetBoardsQuery,
    useGetBoardColumnQuery,
    useGetTasksQuery,
    useChangeBoardColumnMutation,
    useAddBoardMutation,
    useDeleteBoardMutation,
    useChangeBoardNameMutation,
    useAddBoardColumnMutation,
    useDeleteBoardColumnMutation,
    useEditBoardColumnMutation,
    useAddTaskMutation,
    useToggleSubTaskMutation,
    useChangeTaskMutation,
    useDeleteTaskMutation,
    useLoginMutation,
    useRegistrationMutation,
    useGetUserQuery,
    useGetAllUsersQuery,
    useGetUserToBoardQuery,
    useAddUserToBoardsMutation,
    useDeleteUserFromBoardsMutation
} = API
