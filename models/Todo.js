const {model, Schema} = require('mongoose')

const Todo = new Schema({
	title: {type: String, required: true},
	remindTime: {type: Date}
})

module.exports = model('Todo', Todo)