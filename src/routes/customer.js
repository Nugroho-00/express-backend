const router = require('express').Router()
const categoryController = require('../controllers/kategori')
const itemsController = require('../controllers/items')
const usersController = require('../controllers/profile')
const cartsController = require('../controllers/chart')
const addressController = require('../controllers/address')
const upload = require('../helpers/upload')

// user detail and address
router.post('/profile', upload.single('picture'), usersController.createProfile)
router.get('/profile/:id', usersController.getDetailProfile) // show user detail
router.patch('/profile/editpart/:id', upload.single('picture'), usersController.updatePartialProfile) // edit user detail
router.put('/profile/edit:id', upload.single('picture'), usersController.updateProfile)
router.delete('/profile/delete/:id', usersController.deleteProfile) // delete user
router.get('/address/:id', addressController.getDetailAddress)
router.get('/address', addressController.getAddress)
router.post('/address', addressController.createAddress)
// router.put('/:id', updateAddress)
router.patch('/address/:id', addressController.updatePartialAddress)
router.delete('/address/:id', addressController.deleteAddress)

// categories
router.get('/category', categoryController.getCategory) // show categories
router.get('/category/:id', categoryController.getIdCategory) // show detail category

// products
router.get('/product', itemsController.getItems) // show products
router.get('/product/:id', itemsController.getDetailItem) // show detail product

// cart
router.post('/chart', cartsController.createChart) // add cart
router.get('/chart', cartsController.getChart) // show cart
router.patch('/chart/:id', cartsController.updatePartialChart) // edit cart
router.delete('/chart/:id', cartsController.deleteChart) // delete cart

module.exports = router
