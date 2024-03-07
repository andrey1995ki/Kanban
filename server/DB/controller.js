const db = require('./db')

const selectBoard = 'SELECT CAST(id as TEXT) as id,title from board'
const selectColumn = 'SELECT CAST(id as TEXT) as id,board_id,title,color,final_stage from board_column'
const selectSubTask = 'SELECT CAST(id as TEXT) as id,title,"final",task_id from sub_task'

class SQLController {
    _userLogin = undefined
    _userName = undefined
    _userPassword = undefined

    async boards(req, res) {
        console.log(req);
        try {
            const data = await db.prepare(selectBoard)
            res.json(data.all())
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async boardColumn(req, res) {
        const {board_id} = req.query
        let query = selectColumn
        if (board_id) {
            query = query + ` where board_id=${board_id}`
        }
        try {
            const data = await db.prepare(query)
            res.json(data.all())
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async task(req, res) {
        const {board_column_id} = req.query
        let query = 'SELECT CAST(id as TEXT) as id,board_column_id,board_id,title,description from task '
        if (board_column_id) {
            query = query + ` where board_column_id=${board_column_id}`
        }
        try {
            let tasks = await db.prepare(query).all()
            tasks = await Promise.all(tasks?.map(async task => {
                const getSubTaskQuery = selectSubTask + ` WHERE task_id = ${task.id}`
                const subTask = await db.prepare(getSubTaskQuery).all()
                return {...task, sub_task: subTask}
            }))
            res.json(tasks)
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async addBoard(req, res) {
        const {title} = req.body
        try {
            const insert = await db.prepare('INSERT INTO board (title) VALUES (?)').run(title)
            const lastId = await insert.lastInsertRowid
            const data = await db.prepare(selectBoard + ` where id=${lastId}`).all()
            res.json(data[0])
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async deleteBoard(req, res) {
        const boardId = req.params.id
        try {
            const del = await db.prepare('DELETE FROM board WHERE id=?').run(boardId)
            res.json(del.changes)
        } catch (e) {
            res.status(504).json(e)
        }

    }

    async changeBoardName(req, res) {
        const boardId = req.params.id
        const {title} = req.body
        try {
            await db.prepare('UPDATE board SET title=? WHERE id=?').run(title, boardId)
            const data = await db.prepare(selectBoard + ` where id=${boardId}`).all()
            res.json(data[0])
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async addBoardColumn(req, res) {
        const {board_id, title, color, final_stage} = req.body
        try {
            const insert = await db.prepare(
                'INSERT INTO board_column (board_id, title, color, final_stage) VALUES(?, ?, ?, ?)'
            )
                .run(board_id, title, color, final_stage ? 1 : 0)
            const lastId = await insert.lastInsertRowid
            const data = await db.prepare(selectColumn + ` where id=${lastId}`).all()
            res.json(data[0])
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async deleteBoardColumn(req, res) {
        const columnId = req.params.id
        try {
            const del = await db.prepare('DELETE FROM board_column WHERE id=?').run(columnId)
            res.json(del.changes)
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async editBoardColumn(req, res) {
        const columnId = req.params.id
        const {board_id, title, color, final_stage} = req.body
        try {
            await db.prepare(
                'UPDATE board_column SET board_id=?, title=?, color=?, final_stage=? WHERE id=?'
            ).run(board_id, title, color, final_stage ? 1 : 0, columnId)
            const data = await db.prepare(selectColumn + ` where id=${columnId}`).all()
            res.json(data[0])
        } catch (e) {
            res.status(504).json(e)
        }
    }

    async taskWS(ws) {
        let query = 'SELECT CAST(id as TEXT) as id, CAST(board_column_id as TEXT) as  board_column_id, CAST(board_id as TEXT) as board_id,title,description from task '
        try {
            let tasks = await db.prepare(query).all()
            tasks = await Promise.all(tasks?.map(async task => {
                const getSubTaskQuery = `SELECT CAST(id as TEXT) as id,title,final,task_id from sub_task WHERE task_id = ${task.id}`
                const subTask = await db.prepare(getSubTaskQuery).all()
                return {...task, sub_task: subTask}
            }))
            ws.send(JSON.stringify({data: tasks}))
        } catch (e) {
            ws.send(JSON.stringify({message: e}))
        }
    }

    async deleteTaskWS(ws, taskID, setMessage) {
        try {
            let taskName = await db.prepare(`SELECT title FROM task WHERE id = ${taskID}`).all()[0]
            await db.prepare('DELETE FROM task WHERE id=?').run(taskID)
            setMessage(`Задача ${taskName.title} удалена`)
        } catch (e) {
            ws.send(JSON.stringify({message: e}))
        }
    }

    async addTaskWS(ws, data, setMessage) {
        const {title, description, board_column_id, board_id, sub_task} = data
        try {
            const insert = await db.prepare(
                'INSERT INTO task (board_column_id, board_id, title, description) VALUES(?, ?, ?, ?)'
            )
                .run(board_column_id, board_id, title, description)
            const lastId = await insert.lastInsertRowid
            for await (const task1 of sub_task) {
                db.prepare('INSERT INTO sub_task (title, "final", task_id) VALUES(?, 0, ?)').run(task1.title, lastId)
            }
            setMessage(`Созданая задача: ${title}`)
        } catch (e) {
            ws.send(JSON.stringify({message: e}))
        }
    }

    async updateTaskWs(ws, id, data, setMessage) {
        let param = []
        let sub_task = undefined
        for (let key in data) {
            if (key !== 'sub_task') {
                param = [...param, `${key}= '${data[key]}'`]
            } else {
                sub_task = data[key]
            }
        }
        try {
            if (sub_task) {
                await db.prepare(`DELETE FROM sub_task WHERE task_id =?`).run(id)
                for await (const task of sub_task) {
                    db.prepare('INSERT INTO sub_task (title, "final", task_id) VALUES(?, ?, ?)').run(task.title, task.final ? 1 : 0, id)
                }
            }
            let taskName = await db.prepare(`SELECT title FROM task WHERE id = ${id}`).all()[0]
            if (param.length > 0) {
                await db.prepare(
                    `UPDATE task SET ${param.join(', ')} WHERE id=?`
                ).run(id)
            }
            setMessage(`Внесены изменения в задачу: ${taskName.title}`)
        } catch (e) {
            ws.send(JSON.stringify({message: e}))
        }
    }

    set fiendUser(userLogin) {
        this._userLogin = userLogin
    }

    get fiendUser() {
        return (
            async () => {
                try {
                    let user = await db.prepare(`SELECT password,id FROM users WHERE login = '${this._userLogin}'`).all()
                    return user?.[0] || false;
                } catch (e) {
                    return undefined
                }
            }
        )()
    }

    set addUser(userData) {
        this._userName = userData.name
        this._userPassword = userData.password
    }

    get addUser() {
        return (
            async () => {
                try {
                    await db.prepare(
                        'INSERT INTO users (login, password, user_name) VALUES(?, ?, ?)'
                    )
                        .run(this._userLogin, this._userPassword, this._userName)
                    this._userLogin = undefined
                    this._userName = undefined
                    this._userPassword = undefined
                    return true
                } catch (e) {
                    return undefined
                }
            }
        )()
    }


}

module.exports = new SQLController()
