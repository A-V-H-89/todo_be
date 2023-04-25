const {model, Schema} = require('mongoose')

const Todo = new Schema({
	title: {type: String, required: true},
	type: {type: String, required: true},
	remindTime: {type: Date},
	attachment: {type: File}
})

module.exports = model('Todo', Todo)