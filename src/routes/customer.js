const router = require('express').Router()
const Categori = require('../controllers/kategori')
const Produk = require('../controllers/items')
const Users = require('../controllers/user')
const Chart = require('../controllers/chart')
const Address = require('../controllers/address')
const Rating = require('../controllers/rating')
const Transaksi = require('../controllers/transaction')

// Profile
router.get('/My-profile', Users.getDetailUser)
router.patch('/edit/profile', Users.updateDetail)
router.patch('/edit/picture', Users.updatePict)
router.delete('/delete/account', Users.deleteUser)

// categories
router.get('/view/category', Categori.getCategories)
router.get('/view/detail/category/:id', Categori.detailCategory)

// Produk
router.get('/view/produk', Produk.getItems)
router.get('/view/detail/produk/:id', Produk.detailItems)

// chart
router.post('/add/chart', Chart.create)
router.get('/My-chart', Chart.getAll)
router.get('/My-chart/:id', Chart.detailChart)
router.put('/My-chart/edit/:id', Chart.editCart)
router.delete('/My-chart/delete/:id', Chart.deleteCart)

// address
router.post('/add/address', Address.createAddress)
router.get('/My-address', Address.getAllAddress)
router.get('/My-address/:id', Address.detailAddress)
router.put('/My-address/edit/:id', Address.updateAll)
router.patch('/My-address/update/:id', Address.updatePartial)
router.delete('/My-address/delete/:id', Address.deleteAddress)

// Transaction
router.post('/add/My-order', Transaksi.create)
router.get('/My-order', Transaksi.get)
router.get('/My-order/:id', Transaksi.detail)

// rating
router.post('/give/rating/:id', Rating.create)

module.exports = router
