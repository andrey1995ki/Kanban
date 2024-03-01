const sqlite3 = require('better-sqlite3')
const db = new sqlite3('./DB/kanban.db')
module.exports = db
