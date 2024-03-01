const WSServer = require('express-ws')
const SQLController = require('../DB/controller')


const WSController = function (app) {
    const aWss = WSServer(app).getWss()
    app.ws('/kanban/', (ws) => {
        const currentUserId = (+new Date).toString(16)
        ws.id = currentUserId
        ws.send('succses')
        let message = ''
        const setMessage = (msg) => {
            message = msg
        }
        ws.on('message', (msg) => {
            const {type, id, data} = JSON.parse(msg)
            switch (type) {
                case "delete":
                    SQLController.deleteTaskWS(ws, id, setMessage).then(() => sendMessage(aWss, currentUserId, message))
                    break
                case "update":
                    SQLController.updateTaskWs(ws, id, data, setMessage).then(() => sendMessage(aWss, currentUserId, message))
                    break
                case "create":
                    SQLController.addTaskWS(ws, data, setMessage).then(() => sendMessage(aWss, currentUserId, message))
                    break
                default:
                    sendMessage(aWss, currentUserId)
                    break
            }

        })
    })
}

function sendMessage(aWss, currentUserId, message) {
    aWss.clients.forEach(client => {
        SQLController.taskWS(client)
        if (message && client.id !== currentUserId) {
            client.send(JSON.stringify({'messages': message}))
        }
    })
}

module.exports = WSController
