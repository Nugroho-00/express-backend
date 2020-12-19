const router = require('express').Router()
const authController = require('../controllers/auth')

// login
router.post('/login/admin', authController.loginAdmin)
router.post('/login/seller', authController.loginSeller)
router.post('/login/customer', authController.loginCustomer)

// register
// router.post('/register/admin', authController.registerAdmin)
router.post('/register/seller', authController.registerSeller)
router.post('/register/customer', authController.registerCustomer)
module.exports = router
