const router = require('express').Router()
const Users = require('../controllers/user')
const Produk = require('../controllers/items')
const Store = require('../controllers/store')
const Colors = require('../controllers/color')
const upload = require('../helpers/upload')

// Items
router.post('/post/produk', upload.array('images', 2), Produk.create)
router.get('/Myproduk', Produk.getSellerItems)
router.get('/items/:id', Produk.detailSellerItems)
router.put('/items/:id', Produk.updateItems)
router.delete('/items/:id', Produk.deleteItems)

// user detail
router.get('/profile', Users.getDetailUser)
router.patch('/edit/profile', Users.updateDetail)
router.patch('/edit/picture', Users.updatePict)
router.delete('/delete/profile', Users.deleteUser)

// stores
router.patch('/edit/My-store', Store.updateStore)
router.get('/My-store', Store.getDetailStore)

// color
router.post('/color', Colors.create)
router.get('/color', Colors.getColor)
router.get('/color/:id', Colors.detailColor)
router.put('/color/:id', Colors.updateColor)
router.delete('/color/:id', Colors.deleteColor)

module.exports = router
