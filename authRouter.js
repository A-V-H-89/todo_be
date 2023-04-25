const Router = require('express')
const authRouter = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

authRouter.post('/registration', [
    check('username', 'Filed user cannot be empty').notEmpty(),
    check('password', 'Field cannot be short than 4 character and longer than 10').isLength({min: 4, max: 10})
], controller.registration)
authRouter.post('/login', controller.login)
authRouter.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers)


module.exports = authRouter