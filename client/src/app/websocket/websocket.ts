import {WSAddTaskPayload, WSTaskResponse} from "./websocket.model";

const socketUrl = "ws://localhost:8080";
export const socket = new WebSocket(socketUrl);

let taskCallback: (taskData: Array<WSTaskResponse>) => void

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
    if (Array.isArray(message.data)) taskCallback(message.data)
}

export const TaskApi = {
    start() {
        StartConnection()
    },
    stop() {
        CloseConnections()
    },
    getTasks(callback: (taskData: Array<WSTaskResponse>) => void) {
        taskCallback = callback
        socket.send(JSON.stringify({type: 'read', path: 'task'}));
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
                    path: 'task',
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
                    path: 'task',
                    id: taskId,
                }
            )
        );
    }
}
