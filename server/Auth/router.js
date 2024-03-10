const Router = require("express");
const router = new Router
const authController = require('./controller')
const authenticateToken = require('./middleware')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/user', authenticateToken, (req, res) => {
    const {login, userid, userName} = req.user
    res.json({login, id:userid, name:userName})
})

module.exports = router
