const route = require('express').Router()
const { loginController } = require('../controllers/auth')

route.post('/login', loginController)

module.exports = route
