const Router = require("express");
const router = new Router
const SQLController = require('./DB/controller')
const authenticateToken = require('./Auth/middleware')

// board api
router.get('/board', authenticateToken, SQLController.boards)
router.post('/board', authenticateToken, SQLController.addBoard)
router.delete('/board/:id', authenticateToken, SQLController.deleteBoard)
router.patch('/board/:id', authenticateToken, SQLController.changeBoardName)
router.get('/board/:id/users', authenticateToken, SQLController.usersToBoards)
router.patch('/board/:id/users', authenticateToken, SQLController.addUserToBoards)
router.delete('/board/:id/users', authenticateToken, SQLController.removeUserToBoards)

//board_column api
router.get('/board_column', authenticateToken, SQLController.boardColumn)
router.post('/board_column', authenticateToken, SQLController.addBoardColumn)
router.delete('/board_column/:id', authenticateToken, SQLController.deleteBoardColumn)
router.put('/board_column/:id', authenticateToken, SQLController.editBoardColumn)


router.get('/task', SQLController.task)
router.get('/users', authenticateToken, SQLController.users)

router.get('/chart/board',authenticateToken, SQLController.boardStatistic)

module.exports = router
