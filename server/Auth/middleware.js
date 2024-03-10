const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next)=>{
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token){
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        req.user = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    }
    catch (e) {
        return res.status(401).json({message: 'Пользователь не авторизован'})
    }
}

module.exports= authenticateToken
