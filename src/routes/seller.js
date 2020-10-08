const router = require('express').Router()
const usersController = require('../controllers/user')
const itemsController = require('../controllers/items')
// const storesController = require('../controllers/store')
const addressController = require('../controllers/address')
const upload = require('../helpers/upload')

// user detail
router.get('/detail', usersController.getDetailUser) // users
router.put('/edit', usersController.updatePartialUser) // users and user_details
router.delete('/delete', usersController.deleteUser) // users
router.get('/address/:id', addressController.getDetailAddress)
router.get('/address', addressController.getAddress)
router.post('/address', addressController.createAddress)
// router.put('/:id', updateAddress)
router.patch('/address/:id', addressController.updatePartialAddress)
router.delete('/address/:id', addressController.deleteAddress)

// stores
// router.put('/store', storesController.updateStore) // update store detail

// Items
router.post('/items', upload.array('picture', 4), itemsController.createItem) // add items
// router.post('/items/color', upload.array('picture', 4), itemsController.createColor) // add items
router.get('/items', itemsController.getItems) // show items
router.get('/items/:id', itemsController.getDetailItem) // show detail items
router.put('/items/:id', itemsController.updateItem) // edit items
router.patch('/items/:id', itemsController.updatePartialItem) // edit items
router.delete('/items/:id', itemsController.deleteItem) // delete items

module.exports = router
