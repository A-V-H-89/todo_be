const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config')

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}

	return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
	
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Errors occured duting registration', errors })
			}
			const { username, email, password } = req.body
			const candidate = await User.findOne({ username })

			if (candidate) {
				return res.status(400).json({ message: 'User with this name already exist' })
			}

			const hashPassword = bcrypt.hashSync(password, 7)
			const userRole = await Role.findOne({ value: 'USER' })
			const user = new User({ username, email, password: hashPassword, roles: [userRole.value] })
			await user.save()
			return res.status(200).json({ message: 'User was registered success!', roles: ['USER'] })
		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'Registration error' })
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })
			if (!user) {
				return res.status(400).json({ message: 'User wth this name doesn\'t exist' })
			}

			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return res.status(403).json({ message: 'Password incorrect' })
			}

			const token = generateAccessToken(user._id, user.roles)
			return res.json({ token, roles: user.roles })

		} catch (e) {
			console.log(e)
			res.status(400).json({ message: 'Login error' })
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = new authController();