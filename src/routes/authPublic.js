const router = require('express').Router()
const { authAdminController, authSellerController, authCustController } = require('../controllers/auth')
const usersController = require('../controllers/user')
// const storesController = require('../../controllers/store')

const upload = require('../helpers/upload')
// login
router.post('/login/admin', authAdminController) // admin
router.post('/login/seller', authSellerController) // seller
router.post('/login/customer', authCustController) // customer

// register
router.post('/register/seller', upload.single('picture'), usersController.createUser) // seller
router.post('/register/customer', upload.single('picture'), usersController.createUser) // customer
router.post('/register/admin', upload.single('picture'), usersController.createUser)

module.exports = router
