const {model, Schema} = require('mongoose')

const User = new Schema({
    username: {type: String},
		email: {type: String, unique: true},
    password: {type: String},
    roles: [{type: String, ref: 'Role'}],
    age: {type: Number}
})

module.exports  = model('User', User)