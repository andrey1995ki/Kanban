import {WSAddTaskPayload, WSTaskResponse} from "./websocket.model";

const url = import.meta.env.VITE_BASE_URL || ''
const port = import.meta.env.VITE_BASE_API_PORT || ''
console.log(port);
const socketUrl = `ws://localhost${port}${url}/socket`;
export const socket = new WebSocket(socketUrl);

let taskCallback: (taskData: Array<WSTaskResponse>) => void
let messagesCallback: (messages: string) => void

const StartConnection = () => {
    socket.onopen = (ev) => {
        console.log('Socket opened: ', ev);
    };
    socket.onmessage = ListenerMessages
}
const CloseConnections = () => {
    socket.onclose = (ev) => {
        console.log('Socket closed: ', ev);
    };
}
const ListenerMessages = (m: MessageEvent) => {
    const message = JSON.parse(m.data)
    if (message.messages) messagesCallback(message.messages)
    if (Array.isArray(message.data)) taskCallback(message.data)
}

export const TaskApi = {
    start() {
        StartConnection()
    },
    stop() {
        CloseConnections()
    },
    getTasks(callbackA: (taskData: Array<WSTaskResponse>) => void, callbackB: (messages: string) => void) {
        taskCallback = callbackA
        messagesCallback = callbackB
        socket.send(JSON.stringify({type: 'read'}));
    },
    addTask(taskData: WSAddTaskPayload) {
        socket.send(
            JSON.stringify(
                {
                    type: 'create',
                    path: 'task',
                    data: taskData
                }
            )
        );
    },
    editTask(taskData: Partial<WSAddTaskPayload>, taskId: string) {
        socket.send(
            JSON.stringify(
                {
                    type: 'update',
                    id: taskId,
                    data: taskData
                }
            )
        );
    },
    deleteTask(taskId: string) {
        socket.send(
            JSON.stringify(
                {
                    type: 'delete',
                    id: taskId,
                }
            )
        );
    }
}
