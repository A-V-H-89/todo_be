const Router = require('express');
const itemsRouter = new Router();
const controller = require('./itemsController');
const authMiddleware = require('./middleware/authMiddleware')

itemsRouter.post('/todoItems', authMiddleware, controller.saveItem)
itemsRouter.post('/deleteItem', controller.deleteItem)
itemsRouter.get('/getItems', controller.getItems)

module.exports = itemsRouter
