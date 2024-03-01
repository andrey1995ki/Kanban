const Router = require("express");
const router = new Router
const SQLController = require('./DB/controller')

// board api
router.get('/board', SQLController.boards)
router.post('/board', SQLController.addBoard)
router.delete('/board/:id', SQLController.deleteBoard)
router.patch('/board/:id', SQLController.changeBoardName)

//board_column api
router.get('/board_column', SQLController.boardColumn)
router.post('/board_column', SQLController.addBoardColumn)
router.delete('/board_column/:id', SQLController.deleteBoardColumn)
router.put('/board_column/:id', SQLController.editBoardColumn)


router.get('/task', SQLController.task)


module.exports = router
