const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SQLController = require("../DB/controller");

const generateAccessToken = (username, userid) => {
    return jwt.sign({username, userid}, process.env.TOKEN_SECRET, {expiresIn: '24h'});
}

class authController {
    async registration(req, res) {
        try {
            const {username, password, name} = req.body
            SQLController.fiendUser = username
            const fiendUser = await SQLController.fiendUser
            if (fiendUser) {
                SQLController.fiendUser = undefined
                return res.status(400).json({message: 'Пользователь с указанным именем уже существует'})
            } else if (fiendUser === undefined) {
                SQLController.fiendUser = undefined
                return res.status(400).json({message: 'Произошла непредвиденная ошибка, повторите процесс регистрации'})
            }
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            SQLController.addUser = {password: hashPassword, name}
            const resultAddUser = await SQLController.addUser
            if (resultAddUser === undefined) {
                return res.status(400).json({message: 'Произошла непредвиденная ошибка, повторите процесс регистрации'})
            }
            res.json({message: 'Пользователь успешно добавлен'})
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            SQLController.fiendUser = username
            const {password: userPassword, id: userid} = await SQLController.fiendUser
            const validPassword = bcrypt.compareSync(password, userPassword);
            if (!validPassword) {
                return res.status(400).json({message: 'Введены не правильные логин или пароль'})
            }
            const token = generateAccessToken(username, userid);
            res.json({token})
        } catch (e) {
            res.status(400).json(e)
        }
    }
}

module.exports = new authController()
