const WSServer = require('express-ws')
const SQLController = require('../DB/controller')
const jwt = require('jsonwebtoken');


const WSController = function (app) {
    const aWss = WSServer(app).getWss()
    app.ws('/kanban/socket', (ws) => {
        console.log('start ws server')
        let message = undefined
        const setMessage = (msg) => {
            message = msg
        }
        ws.on('message', (msg) => {
            const {type, id, data, token} = JSON.parse(msg)
            if (token) {
                const {userid} = jwt.verify(token, process.env.TOKEN_SECRET)
                ws.user_id = userid
                switch (type) {
                    case "delete":
                        SQLController.deleteTaskWS(ws, id, setMessage).then(() => sendMessage(aWss, userid, message))
                        break
                    case "update":
                        SQLController.updateTaskWs(ws, id, data, setMessage).then(() => sendMessage(aWss, userid, message))
                        break
                    case "create":
                        SQLController.addTaskWS(ws, data, setMessage).then(() => sendMessage(aWss, userid, message))
                        break
                    default:
                        sendMessage(aWss, userid)
                        break
                }
            }
        })
    })
}

async function sendMessage(aWss, currentUserId, message) {
    for (const client of aWss.clients) {
        await SQLController.taskWS(client, client.user_id)
        if (message && client.user_id !== currentUserId) {
            SQLController.availableUserBoards = client.user_id
            const availableBoard = await SQLController.availableUserBoards
            if (availableBoard.find(board => Number(board.board_id) === Number(message.board))) {
                client.send(JSON.stringify({'messages': message.message}))
            }
        }
    }
}

module.exports = WSController
