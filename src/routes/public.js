const { Router } = require('express')
const produk = require('../controllers/items')
const category = require('../controllers/kategori')

const router = Router()

router.get('/view/produk', produk.getItems)
router.get('/view/produk/detail/:id', produk.detailItems)
router.get('/view/categori', category.getCategories)
router.get('/view/detail/categori/:id', category.detailCategory)

module.exports = router
