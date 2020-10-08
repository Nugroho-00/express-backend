const { Router } = require('express')
const { getItems, getDetailItem } = require('../controllers/items')
const { getIdCategory, getCategory } = require('../controllers/kategori')

const router = Router()

router.get('/home', getItems)
router.get('/home/:id', getDetailItem)
router.get('/categori/:id', getIdCategory)
router.get('/categori', getCategory)

module.exports = router
